/* =========================================================
   오목 대전 — 게임 로직
   - 15x15 바둑판, 사람 대 사람(같은 화면에서 번갈아 착수)
   - 시작 / 종료 / 다시하기 / 무르기
   - 승·패·무 전적과 승률을 localStorage에 저장
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 상수 ---------- */
  var SIZE = 15;                  // 줄 수 (15줄 = 225개 교차점)
  var EMPTY = 0, BLACK = 1, WHITE = 2;
  var STORAGE_KEY = 'omok.save.v1';
  var STAR_POINTS = [[3, 3], [3, 7], [3, 11], [7, 3], [7, 7], [7, 11], [11, 3], [11, 7], [11, 11]];
  var COL_LABELS = 'ABCDEFGHIJKLMNO'.split('');
  var DIRECTIONS = [[1, 0], [0, 1], [1, 1], [1, -1]]; // →, ↓, ↘, ↗

  /* ---------- DOM ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var canvas = $('board');
  var ctx = canvas.getContext('2d');

  var el = {
    turnStone: $('turnStone'), turnText: $('turnText'),
    cover: $('boardCover'), coverText: document.querySelector('.board-cover__text'),
    coverStartBtn: $('coverStartBtn'),
    moveCount: $('moveCount'), timer: $('timer'), lastMove: $('lastMove'), hint: $('hint'),
    startBtn: $('startBtn'), restartBtn: $('restartBtn'), undoBtn: $('undoBtn'), stopBtn: $('stopBtn'),
    nameBlack: $('nameBlack'), nameWhite: $('nameWhite'),
    rateBlack: $('rateBlack'), rateWhite: $('rateWhite'),
    barBlack: $('barBlack'), barWhite: $('barWhite'),
    detailBlack: $('detailBlack'), detailWhite: $('detailWhite'),
    recordBlack: $('recordBlack'), recordWhite: $('recordWhite'),
    overlineOption: $('overlineOption'), resetStatsBtn: $('resetStatsBtn'),
    history: $('history'),
    result: $('result'), resultEmoji: $('resultEmoji'), resultTitle: $('resultTitle'),
    resultDesc: $('resultDesc'), resultAgainBtn: $('resultAgainBtn'), resultCloseBtn: $('resultCloseBtn')
  };

  /* ---------- 게임 상태 ---------- */
  var game = {
    board: createBoard(),
    turn: BLACK,
    status: 'idle',   // idle(대기) | playing(진행) | over(종료)
    moves: [],        // [{ x, y, color }]
    winner: EMPTY,    // EMPTY | BLACK | WHITE
    isDraw: false,
    winLine: [],      // 승리한 다섯 점
    hover: null,      // 마우스가 가리키는 교차점
    startedAt: 0,
    elapsed: 0        // 초
  };

  /* ---------- 저장 데이터 ---------- */
  var save = loadSave();
  var timerId = null;
  var metrics = { size: 0, pad: 0, cell: 0 }; // 캔버스 좌표 계산값

  /* =========================================================
     저장 / 불러오기
     ========================================================= */
  function defaultSave() {
    return {
      names: { black: '플레이어 1', white: '플레이어 2' },
      stats: {
        black: { win: 0, lose: 0, draw: 0 },
        white: { win: 0, lose: 0, draw: 0 }
      },
      allowOverline: true,
      history: []
    };
  }

  function loadSave() {
    var base = defaultSave();
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return base;

      if (parsed.names) {
        base.names.black = String(parsed.names.black || base.names.black).slice(0, 10);
        base.names.white = String(parsed.names.white || base.names.white).slice(0, 10);
      }
      ['black', 'white'].forEach(function (side) {
        var s = parsed.stats && parsed.stats[side];
        if (!s) return;
        base.stats[side] = {
          win: toCount(s.win), lose: toCount(s.lose), draw: toCount(s.draw)
        };
      });
      if (typeof parsed.allowOverline === 'boolean') base.allowOverline = parsed.allowOverline;
      if (Array.isArray(parsed.history)) base.history = parsed.history.slice(0, 10);
      return base;
    } catch (e) {
      return base;  // 저장소 접근 불가(시크릿 모드 등)에도 게임은 정상 동작
    }
  }

  function persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
    } catch (e) { /* 저장 실패는 무시하고 진행 */ }
  }

  function toCount(v) {
    var n = Number(v);
    return (isFinite(n) && n > 0) ? Math.floor(n) : 0;
  }

  /* =========================================================
     보드 유틸
     ========================================================= */
  function createBoard() {
    var b = [];
    for (var y = 0; y < SIZE; y++) {
      b.push(new Array(SIZE).fill(EMPTY));
    }
    return b;
  }

  function inRange(x, y) {
    return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
  }

  function coordText(x, y) {
    return COL_LABELS[x] + (SIZE - y);   // 예: H8
  }

  function playerName(color) {
    var raw = color === BLACK ? save.names.black : save.names.white;
    return raw.trim() || (color === BLACK ? '흑돌' : '백돌');
  }

  /* =========================================================
     승리 판정
     ========================================================= */
  function findWinLine(x, y, color) {
    for (var d = 0; d < DIRECTIONS.length; d++) {
      var dx = DIRECTIONS[d][0], dy = DIRECTIONS[d][1];
      var line = [[x, y]];

      // 양방향으로 같은 색 돌을 모은다
      var step;
      for (step = 1; step < SIZE; step++) {
        var nx = x + dx * step, ny = y + dy * step;
        if (!inRange(nx, ny) || game.board[ny][nx] !== color) break;
        line.push([nx, ny]);
      }
      for (step = 1; step < SIZE; step++) {
        var px = x - dx * step, py = y - dy * step;
        if (!inRange(px, py) || game.board[py][px] !== color) break;
        line.unshift([px, py]);
      }

      if (line.length === 5) return line;
      if (line.length > 5 && save.allowOverline) return line.slice(0, 5);
      // 장목 불인정 설정이면 6목 이상은 승리로 치지 않는다
    }
    return null;
  }

  /* =========================================================
     캔버스 렌더링
     ========================================================= */
  function resizeCanvas() {
    var rect = canvas.getBoundingClientRect();
    var css = Math.max(240, Math.round(rect.width));
    var dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(css * dpr);
    canvas.height = Math.round(css * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    metrics.size = css;
    metrics.pad = Math.round(css * 0.058);
    metrics.cell = (css - metrics.pad * 2) / (SIZE - 1);
    draw();
  }

  function toPixel(i) { return metrics.pad + i * metrics.cell; }

  function draw() {
    var size = metrics.size, pad = metrics.pad, cell = metrics.cell;
    if (!size) return;

    // 판 배경
    ctx.fillStyle = '#e4bd7f';
    ctx.fillRect(0, 0, size, size);
    var grain = ctx.createLinearGradient(0, 0, size, size);
    grain.addColorStop(0, 'rgba(255,255,255,.18)');
    grain.addColorStop(.5, 'rgba(255,255,255,0)');
    grain.addColorStop(1, 'rgba(120,72,20,.16)');
    ctx.fillStyle = grain;
    ctx.fillRect(0, 0, size, size);

    // 격자
    ctx.strokeStyle = 'rgba(60,38,12,.75)';
    ctx.lineWidth = Math.max(1, cell * 0.035);
    ctx.beginPath();
    for (var i = 0; i < SIZE; i++) {
      var p = toPixel(i);
      ctx.moveTo(pad, p); ctx.lineTo(size - pad, p);
      ctx.moveTo(p, pad); ctx.lineTo(p, size - pad);
    }
    ctx.stroke();

    // 화점
    ctx.fillStyle = 'rgba(60,38,12,.85)';
    STAR_POINTS.forEach(function (pt) {
      ctx.beginPath();
      ctx.arc(toPixel(pt[0]), toPixel(pt[1]), Math.max(2, cell * 0.1), 0, Math.PI * 2);
      ctx.fill();
    });

    // 좌표 라벨
    ctx.fillStyle = 'rgba(60,38,12,.7)';
    ctx.font = Math.max(9, Math.round(cell * 0.42)) + 'px ' +
      '"Apple SD Gothic Neo", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var k = 0; k < SIZE; k++) {
      ctx.fillText(COL_LABELS[k], toPixel(k), pad * 0.5);
      ctx.fillText(String(SIZE - k), pad * 0.5, toPixel(k));
    }

    // 착수한 돌
    for (var y = 0; y < SIZE; y++) {
      for (var x = 0; x < SIZE; x++) {
        if (game.board[y][x] !== EMPTY) drawStone(x, y, game.board[y][x], 1);
      }
    }

    // 마우스 미리보기
    if (game.status === 'playing' && game.hover) {
      var h = game.hover;
      if (game.board[h.y][h.x] === EMPTY) drawStone(h.x, h.y, game.turn, 0.38);
    }

    // 마지막 착수 표시
    var last = game.moves[game.moves.length - 1];
    if (last) {
      ctx.strokeStyle = last.color === BLACK ? '#ffd9a8' : '#b4531f';
      ctx.lineWidth = Math.max(1.5, cell * 0.07);
      ctx.beginPath();
      ctx.arc(toPixel(last.x), toPixel(last.y), cell * 0.2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 승리 라인 강조
    if (game.winLine.length) {
      ctx.strokeStyle = 'rgba(180,38,30,.9)';
      ctx.lineWidth = Math.max(2, cell * 0.09);
      game.winLine.forEach(function (pt) {
        ctx.beginPath();
        ctx.arc(toPixel(pt[0]), toPixel(pt[1]), cell * 0.44, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
  }

  function drawStone(x, y, color, alpha) {
    var cx = toPixel(x), cy = toPixel(y), r = metrics.cell * 0.44;

    ctx.save();
    ctx.globalAlpha = alpha;

    // 그림자
    ctx.fillStyle = 'rgba(60,38,12,.28)';
    ctx.beginPath();
    ctx.arc(cx + r * 0.1, cy + r * 0.12, r, 0, Math.PI * 2);
    ctx.fill();

    var g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.38, r * 0.1, cx, cy, r);
    if (color === BLACK) {
      g.addColorStop(0, '#6d6760');
      g.addColorStop(1, '#15130f');
    } else {
      g.addColorStop(0, '#ffffff');
      g.addColorStop(1, '#cfc8ba');
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(30,24,16,.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  /* =========================================================
     좌표 변환 (화면 → 교차점)
     ========================================================= */
  function pointFromEvent(ev) {
    var rect = canvas.getBoundingClientRect();
    var px = ev.clientX - rect.left;
    var py = ev.clientY - rect.top;

    var x = Math.round((px - metrics.pad) / metrics.cell);
    var y = Math.round((py - metrics.pad) / metrics.cell);
    if (!inRange(x, y)) return null;

    // 교차점에서 너무 멀면 무시 (오조작 방지)
    var dist = Math.hypot(px - toPixel(x), py - toPixel(y));
    if (dist > metrics.cell * 0.5) return null;
    return { x: x, y: y };
  }

  /* =========================================================
     게임 흐름
     ========================================================= */
  function startGame() {
    game.board = createBoard();
    game.moves = [];
    game.turn = BLACK;
    game.winner = EMPTY;
    game.isDraw = false;
    game.winLine = [];
    game.hover = null;
    game.elapsed = 0;
    game.startedAt = Date.now();
    game.status = 'playing';

    hideResult();
    startTimer();
    render();
    setHint(playerName(BLACK) + '님(흑돌)부터 시작합니다.');
  }

  function stopGame(options) {
    var silent = options && options.silent;
    if (game.status === 'playing' && !silent) {
      var ok = window.confirm('진행 중인 판을 종료할까요?\n종료한 판은 전적에 반영되지 않습니다.');
      if (!ok) return;
    }
    stopTimer();
    game.status = 'idle';
    game.board = createBoard();
    game.moves = [];
    game.turn = BLACK;
    game.winner = EMPTY;
    game.isDraw = false;
    game.winLine = [];
    game.hover = null;
    game.elapsed = 0;
    hideResult();
    render();
    setHint('대국을 종료했습니다. 시작 버튼을 누르면 새 판이 열립니다.');
  }

  function restartGame() {
    if (game.status === 'playing' && game.moves.length > 0) {
      var ok = window.confirm('진행 중인 판을 버리고 새로 시작할까요?\n현재 판은 전적에 반영되지 않습니다.');
      if (!ok) return;
    }
    startGame();
  }

  function placeStone(x, y) {
    if (game.status !== 'playing') return;
    if (game.board[y][x] !== EMPTY) {
      setHint('이미 돌이 놓인 자리입니다. 빈 교차점을 선택하세요.');
      return;
    }

    var color = game.turn;
    game.board[y][x] = color;
    game.moves.push({ x: x, y: y, color: color });

    var line = findWinLine(x, y, color);
    if (line) {
      game.winLine = line;
      finishGame(color, false);
      return;
    }

    if (game.moves.length === SIZE * SIZE) {
      finishGame(EMPTY, true);
      return;
    }

    game.turn = (color === BLACK) ? WHITE : BLACK;
    game.hover = null;
    render();
    setHint(playerName(game.turn) + '님(' + (game.turn === BLACK ? '흑돌' : '백돌') + ') 차례입니다.');
  }

  function undo() {
    if (game.status !== 'playing' || game.moves.length === 0) return;
    var last = game.moves.pop();
    game.board[last.y][last.x] = EMPTY;
    game.turn = last.color;
    game.hover = null;
    render();
    setHint(coordText(last.x, last.y) + ' 착수를 취소했습니다.');
  }

  function finishGame(winner, isDraw) {
    stopTimer();
    game.status = 'over';
    game.winner = winner;
    game.isDraw = isDraw;
    game.hover = null;

    recordResult(winner, isDraw);
    render();
    showResult();
  }

  /* =========================================================
     전적 기록
     ========================================================= */
  function recordResult(winner, isDraw) {
    if (isDraw) {
      save.stats.black.draw += 1;
      save.stats.white.draw += 1;
    } else if (winner === BLACK) {
      save.stats.black.win += 1;
      save.stats.white.lose += 1;
    } else {
      save.stats.white.win += 1;
      save.stats.black.lose += 1;
    }

    save.history.unshift({
      result: isDraw ? 'draw' : (winner === BLACK ? 'black' : 'white'),
      winner: isDraw ? '' : playerName(winner),
      moves: game.moves.length,
      seconds: game.elapsed,
      at: Date.now()
    });
    save.history = save.history.slice(0, 10);
    persist();
    renderStats();
    renderHistory();
  }

  function resetStats() {
    if (!window.confirm('저장된 전적과 최근 대국 기록을 모두 지울까요?\n지운 기록은 되돌릴 수 없습니다.')) return;
    save.stats = defaultSave().stats;
    save.history = [];
    persist();
    renderStats();
    renderHistory();
    setHint('전적을 초기화했습니다.');
  }

  function winRate(s) {
    var decided = s.win + s.lose;
    return decided === 0 ? 0 : (s.win / decided) * 100;
  }

  /* =========================================================
     화면 갱신
     ========================================================= */
  function render() {
    draw();
    renderTurn();
    renderMeta();
    renderButtons();
    renderCover();
  }

  function renderTurn() {
    if (game.status === 'playing') {
      var isBlack = game.turn === BLACK;
      el.turnStone.dataset.color = isBlack ? 'black' : 'white';
      el.turnText.textContent = playerName(game.turn) + ' · ' + (isBlack ? '흑돌' : '백돌') + ' 차례';
      el.recordBlack.classList.toggle('record--turn', isBlack);
      el.recordWhite.classList.toggle('record--turn', !isBlack);
      return;
    }

    el.recordBlack.classList.remove('record--turn');
    el.recordWhite.classList.remove('record--turn');

    if (game.status === 'over') {
      if (game.isDraw) {
        el.turnStone.dataset.color = 'none';
        el.turnText.textContent = '무승부로 끝났습니다.';
      } else {
        el.turnStone.dataset.color = game.winner === BLACK ? 'black' : 'white';
        el.turnText.textContent = playerName(game.winner) + ' 승리!';
      }
      return;
    }

    el.turnStone.dataset.color = 'none';
    el.turnText.textContent = '시작 버튼을 눌러 대국을 시작하세요.';
  }

  function renderMeta() {
    el.moveCount.textContent = game.moves.length + '수';
    el.timer.textContent = formatTime(game.elapsed);
    var last = game.moves[game.moves.length - 1];
    el.lastMove.textContent = last
      ? '마지막 착수 ' + coordText(last.x, last.y) + '(' + (last.color === BLACK ? '흑' : '백') + ')'
      : '마지막 착수 —';
  }

  function renderButtons() {
    var playing = game.status === 'playing';
    el.startBtn.disabled = playing;
    el.startBtn.textContent = game.status === 'over' ? '새 대국' : '시작';
    el.restartBtn.disabled = game.status === 'idle';
    el.undoBtn.disabled = !playing || game.moves.length === 0;
    el.stopBtn.disabled = game.status === 'idle';
  }

  function renderCover() {
    if (game.status === 'idle') {
      el.cover.hidden = false;
      el.cover.style.display = '';
      el.coverText.textContent = '대국 준비 완료';
    } else {
      el.cover.hidden = true;
      el.cover.style.display = 'none';
    }
  }

  function renderStats() {
    [['black', el.rateBlack, el.barBlack, el.detailBlack],
     ['white', el.rateWhite, el.barWhite, el.detailWhite]].forEach(function (row) {
      var s = save.stats[row[0]];
      var rate = winRate(s);
      var games = s.win + s.lose + s.draw;
      row[1].innerHTML = rate.toFixed(1) + '<span>%</span>';
      row[2].style.width = rate + '%';
      row[3].textContent = games + '전 ' + s.win + '승 ' + s.lose + '패 ' + s.draw + '무';
    });
  }

  function renderHistory() {
    if (!save.history.length) {
      el.history.innerHTML = '<li class="history__empty">아직 기록이 없습니다.</li>';
      return;
    }
    el.history.innerHTML = '';
    save.history.forEach(function (h) {
      var li = document.createElement('li');
      var label = document.createElement('span');
      if (h.result === 'draw') {
        label.textContent = '무승부 · ' + h.moves + '수';
      } else {
        label.textContent = (h.result === 'black' ? '흑' : '백') + ' ' + (h.winner || '') + ' 승 · ' + h.moves + '수';
      }
      var time = document.createElement('span');
      time.className = 'history__time';
      time.textContent = formatTime(h.seconds || 0);
      li.appendChild(label);
      li.appendChild(time);
      el.history.appendChild(li);
    });
  }

  function setHint(text) { el.hint.textContent = text; }

  /* =========================================================
     결과 알림
     ========================================================= */
  function showResult() {
    if (game.isDraw) {
      el.resultEmoji.textContent = '🤝';
      el.resultTitle.textContent = '무승부';
      el.resultDesc.textContent = '판이 모두 찼습니다. ' + game.moves.length + '수 · ' + formatTime(game.elapsed);
    } else {
      var s = save.stats[game.winner === BLACK ? 'black' : 'white'];
      el.resultEmoji.textContent = '🎉';
      el.resultTitle.textContent = playerName(game.winner) + ' 승리!';
      el.resultDesc.textContent =
        (game.winner === BLACK ? '흑돌' : '백돌') + ' · ' + game.moves.length + '수 · ' + formatTime(game.elapsed) +
        ' · 누적 승률 ' + winRate(s).toFixed(1) + '%';
    }
    el.result.hidden = false;
    el.resultAgainBtn.focus();
  }

  function hideResult() { el.result.hidden = true; }

  /* =========================================================
     타이머
     ========================================================= */
  function startTimer() {
    stopTimer();
    timerId = window.setInterval(function () {
      game.elapsed = Math.floor((Date.now() - game.startedAt) / 1000);
      el.timer.textContent = formatTime(game.elapsed);
    }, 1000);
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* =========================================================
     이벤트 연결
     ========================================================= */
  canvas.addEventListener('click', function (ev) {
    var pt = pointFromEvent(ev);
    if (!pt) return;
    if (game.status !== 'playing') {
      setHint('시작 버튼을 눌러 대국을 시작하세요.');
      return;
    }
    placeStone(pt.x, pt.y);
  });

  canvas.addEventListener('mousemove', function (ev) {
    if (game.status !== 'playing') return;
    var pt = pointFromEvent(ev);
    var changed = (!pt && game.hover) || (pt && (!game.hover || game.hover.x !== pt.x || game.hover.y !== pt.y));
    if (!changed) return;
    game.hover = pt;
    draw();
  });

  canvas.addEventListener('mouseleave', function () {
    if (!game.hover) return;
    game.hover = null;
    draw();
  });

  el.startBtn.addEventListener('click', startGame);
  el.coverStartBtn.addEventListener('click', startGame);
  el.restartBtn.addEventListener('click', restartGame);
  el.undoBtn.addEventListener('click', undo);
  el.stopBtn.addEventListener('click', function () { stopGame(); });
  el.resetStatsBtn.addEventListener('click', resetStats);

  el.resultAgainBtn.addEventListener('click', startGame);
  el.resultCloseBtn.addEventListener('click', function () {
    hideResult();
    setHint('판을 확인한 뒤 다시하기 또는 새 대국을 눌러 주세요.');
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !el.result.hidden) hideResult();
  });

  [['black', el.nameBlack], ['white', el.nameWhite]].forEach(function (row) {
    row[1].addEventListener('input', function () {
      save.names[row[0]] = row[1].value.slice(0, 10);
      persist();
      renderTurn();
    });
  });

  el.overlineOption.addEventListener('change', function () {
    save.allowOverline = el.overlineOption.checked;
    persist();
    setHint(save.allowOverline
      ? '6목 이상도 승리로 인정합니다.'
      : '정확히 5목일 때만 승리로 인정합니다.');
  });

  window.addEventListener('resize', resizeCanvas);

  /* =========================================================
     초기화
     ========================================================= */
  el.nameBlack.value = save.names.black;
  el.nameWhite.value = save.names.white;
  el.overlineOption.checked = save.allowOverline;
  renderStats();
  renderHistory();
  render();
  resizeCanvas();
})();
