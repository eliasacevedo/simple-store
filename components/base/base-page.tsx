import Footer from "./footer"
import Header from "./header"

export interface BasePageProps{
    children: React.ReactNode
}
export default function BasePage({children}: BasePageProps) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}