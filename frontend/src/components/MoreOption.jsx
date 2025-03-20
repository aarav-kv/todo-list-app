import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash, faCheck, faSearch, faListCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/MoreOption.css";
import isMobileView from "../hooks/isMobileView";

const MoreOption = ({ toggleSearchBar, handleTaskDeletion }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false); // Track search mode
    const isViewMobile = isMobileView();

    const handleSearchToggle = () => {
        setIsSearchMode((prev) => !prev); // Toggle search mode
        toggleSearchBar();
    };

    return (
        <div className="more-option-container">
            {/* Three-dot menu icon */}
            <div
                className={`menu-toggle ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Action container, shown when isOpen is true */}
            {isOpen && (
                <div className="action-container">
                    {isViewMobile && (
                        <span className="search-icon" onClick={handleSearchToggle}>
                            <FontAwesomeIcon icon={isSearchMode ? faListCheck : faSearch} className="icon" />
                        </span>
                    )}

                    <span className="delete-button" onClick={handleTaskDeletion}>
                        <FontAwesomeIcon icon={faTrash} className="icon" style={{ color: "red" }} />
                    </span>

                    <span className="make-completed-button">
                        <FontAwesomeIcon icon={faCheck} className="icon" style={{ color: "green" }} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default MoreOption;
