import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Tabs.css';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs">
      <div className="tab-headers">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`tab-header ${activeTab === child.props.label ? 'active' : ''}`}
            onClick={() => handleClick(child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <AnimatePresence mode="wait">
          {children.map((child) => {
            if (child.props.label !== activeTab) return null;
            return (
              <motion.div
                key={child.props.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {child.props.children}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabPanel = ({ label, children }) => {
  return <div label={label}>{children}</div>;
};

export { Tabs, TabPanel };