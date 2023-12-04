import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArticleThumbnail from "./articleThumbnail";
import { Article } from "../models";

type articlesProps = {
    articles: Article[];
};

const RecentlyAdded: FunctionComponent<articlesProps> = ({ articles }) => {
    // put articles in date butckets and sort the buckets

    return (
        <div >
            RecentlyAdded:
            <div style={{textAlign: 'start'}}>
                {articles.map((articleI: Article) => (
                    <div key={articleI.uuid}>{articleI.title}</div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;
