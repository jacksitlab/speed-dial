import * as React from 'react';
import PageWrapper from './pageWrapper';

export interface IMainPageProperties {
    dataSourceUrl: string;
}
class MainPage extends React.Component<IMainPageProperties>{

    public constructor(props: IMainPageProperties) {
        super(props);
    }
    render() {
        return <PageWrapper>

        </PageWrapper>
    }
}
export default MainPage;