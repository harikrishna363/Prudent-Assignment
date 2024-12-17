import Header from '../Header'
import { AppBgContainer, PageContainer } from './styledComponent'

const Source = (props) => {

    return(
        <AppBgContainer>
            <Header />
            <PageContainer>
                {props.children}
            </PageContainer>
        </AppBgContainer>

    )
}

export default Source