document.addEventListener('DOMContentLoaded', function() {
    // 查找所有带有 'code-foldable' 类的 <pre> 元素
    const foldableCodeBlocks = document.querySelectorAll('pre.code-foldable');

    foldableCodeBlocks.forEach(preElement => {
        const originalMaxHeight = preElement.style.maxHeight;
        preElement.style.maxHeight = 'none'; // 暂时移除高度限制
        const isOverflowing = preElement.scrollHeight > preElement.clientHeight;
        preElement.style.maxHeight = originalMaxHeight; // 恢复原始高度限制

        if (isOverflowing) {
            preElement.classList.add('code-foldable');

            const button = document.createElement('div');
            button.classList.add('fold-button');
            button.textContent = '显示更多代码'; // 初始按钮文本

            preElement.appendChild(button);

            button.addEventListener('click', function() {
                preElement.classList.toggle('expanded');

                if (preElement.classList.contains('expanded')) {
                    button.textContent = '折叠代码';
                } else {
                    button.textContent = '显示更多代码';
                }
            });
        } else {
            preElement.classList.remove('code-foldable');
        }
    });
});
