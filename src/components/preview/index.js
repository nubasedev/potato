import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
export const MdePreview = forwardRef(({ markdown, generateMarkdownPreview, loadingPreview }, ref) => {
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState('');
    const [prevMarkdown, setPrevMarkdown] = useState('');
    const generatePreview = useCallback(async () => {
        setPreview(await generateMarkdownPreview(markdown));
        setLoading(false);
    }, [generateMarkdownPreview, markdown]);
    useEffect(() => {
        if (markdown !== prevMarkdown) {
            generatePreview();
            setPrevMarkdown(markdown);
        }
    }, [prevMarkdown, markdown, generatePreview]);
    let content = null;
    if (loading) {
        content = (_jsx("div", { className: styles.content, "data-fc-mde-preview-content": true, children: loadingPreview }));
    }
    else {
        content = (_jsx("div", { className: styles.content, ref: ref, "data-fc-mde-preview-content": true, dangerouslySetInnerHTML: { __html: preview } }));
    }
    return (_jsx("div", { "data-mde-preview": true, "data-loading": loading || undefined, children: content }));
});
MdePreview.displayName = 'MdePreview';
