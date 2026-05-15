import PageHeader from '../src/components/PageHeader'
import PageFooter from '../src/components/PageFooter'
import { Outlet } from 'react-router-dom'


function Layout() {
    return (
        <>
            <PageHeader />
            <Outlet />
            <PageFooter />
        </>

    )
}
export default Layout;