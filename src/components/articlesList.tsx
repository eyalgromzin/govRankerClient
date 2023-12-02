import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type articlesProps = {};

const ArticlesList: FunctionComponent<articlesProps> = ({ }) => {
    const articles = useSelector(
        (state: RootState) => state.data1.articles
    ); // see store.ts

    return (
        <Fragment>
            <div>
                {articles.map((articleI) => (
                    <li key={articleI.uuid}>{articleI.title}</li>
                ))}
            </div>
        </Fragment>
    );
};

export default ArticlesList;