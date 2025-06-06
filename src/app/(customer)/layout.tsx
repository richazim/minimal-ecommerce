import Nav from "@/components/Nav/Nav"
import NavLink from "@/components/Nav/NavLink"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      
      <div className="container my-6">{children}</div>
    </>
  )
}
