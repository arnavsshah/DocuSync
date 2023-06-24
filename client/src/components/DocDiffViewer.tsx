import { Paper } from "@mantine/core";
import ReactDiffViewer from 'react-diff-viewer';

export const DocDiffViewer = (props: {oldText: string, newText: string}) => {
    const { oldText, newText } = props;
    return (
        <ReactDiffViewer oldValue={oldText} newValue={newText} splitView={true} />
    );
}