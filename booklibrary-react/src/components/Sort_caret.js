import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function sortCaret(order, column) {
    if (!order) {
        return (<span>&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} /></span>);
    } else if (order === 'asc') {
        return (<span>&nbsp;&nbsp;<font><FontAwesomeIcon icon={faSortUp} /></font></span>);
    } else if (order === 'desc') {
        return (<span>&nbsp;&nbsp;<font><FontAwesomeIcon icon={faSortDown} /></font></span>);
    }
}
export default sortCaret