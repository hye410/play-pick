import Link from "next/link";
const menus = [
  {
    name: "로그인",
    path: "/sign-in",
  },
  {
    name: "회원가입",
    path: "/sign-up",
  },
];
const Nav = () => {
  return (
    <nav>
      <ul className="flex">
        {menus.map((menu) => (
          <li key={menu.name} className="ml-3">
            <Link href={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
