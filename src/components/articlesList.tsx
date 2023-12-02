import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArticleThumbnail from "./articleThumbnail";
import { Article } from "../models";

type articlesProps = {};

const ArticlesList: FunctionComponent<articlesProps> = ({}) => {
    const articles = useSelector((state: RootState) => state.data1.articles); // see store.ts

    // put articles in date butckets and sort the buckets
    const articlesDictionary: any = {};

    articles.forEach((articleI: Article) => {
        if (!(articleI.date in articlesDictionary)) {
            articlesDictionary[articleI.date] = [];
        }

        articlesDictionary[articleI.date].push(articleI);
    });

    return (
        <Fragment>
            <div>
                {Object.keys(articlesDictionary).map((dateI: string) => {
                    return <div key={dateI}>
                        <div style={{textAlign: 'start', fontWeight: 'bold', fontSize: '22px', marginTop: '20px'}}>{dateI}</div>
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
                    </div>;
                })}
            </div>
        </Fragment>
    );
};

export default ArticlesList;
