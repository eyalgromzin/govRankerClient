import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArticleThumbnail from "./articleThumbnail";
import { Article } from "../models";

type articlesProps = {};

const ArticlesList: FunctionComponent<articlesProps> = ({}) => {
    const articles = useSelector((state: RootState) => state.data1.articles); // see store.ts

    return (
        <Fragment>
            <div>
                {articles.map((articleI: Article) => (
                    <div key={articleI.uuid}>
                        <ArticleThumbnail
                            uuid={articleI.uuid}
                            title={articleI.title}
                            url={articleI.url}
                            date={articleI.date}
                            description={articleI.description}
                            imageUrl={articleI.imageUrl}
                            rating={0}
                            creationDate={articleI.creationDate}
                        />
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default ArticlesList;
