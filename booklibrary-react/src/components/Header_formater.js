function headerFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filterElement}
            <div>{column.text}{sortElement}</div>
        </div>
    );
}
export default headerFormatter