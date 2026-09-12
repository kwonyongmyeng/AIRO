import { navItems, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-900 py-14 text-brand-100">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-2xl font-bold tracking-tight text-white">
              {site.brand}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              {site.description}
            </p>
            <p className="mt-5 text-sm">
              대표 {site.ownerName} · {site.email} · {site.phone}
            </p>
          </div>

          <nav aria-label="푸터 메뉴">
            <p className="text-sm font-bold text-white">바로가기</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-white hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs leading-relaxed">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p className="mt-2 text-brand-200">
            본 페이지의 학력·경력·성과 지표 및 사례는 데모용 가상 데이터입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
