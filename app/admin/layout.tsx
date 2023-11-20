import { ReactNode } from "react"
import AdminNav from "../components/admin/AdminNav"

export const metadata = {
	title: "Admin page",
	description: "Ridzi admin dashboard",
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<AdminNav />
			{children}
		</div>
	)
}

export default AdminLayout
