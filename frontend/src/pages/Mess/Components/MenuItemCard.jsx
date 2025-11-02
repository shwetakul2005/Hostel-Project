import React from 'react';
import './MenuItemCard.css';

function MenuItemCard(props) {
    const { item, isAvailable, onToggleStatus, onDelete } = props;

    return (
        <div className="menu-item-card">
            <span className="item-card-name">{item.name}</span>
            <div className="item-card-actions">
                {isAvailable ? (
                    <button 
                        className="btn-toggle remove"
                        onClick={onToggleStatus}
                        title="Remove from student menu"
                    >
                        Remove from Menu
                    </button>
                ) : (
                    <button 
                        className="btn-toggle add"
                        onClick={onToggleStatus}
                        title="Add to student menu"
                    >
                        Add to Menu
                    </button>
                )}
                
                <button 
                    className="btn-delete-item"
                    onClick={onDelete}
                    title="Permanently delete item"
                >
                    Delete Item
                </button>
            </div>
        </div>
    );
}

export default MenuItemCard;