import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const MenuWrapper = (props) => {

    // props:
    //     children: JSX.Element;
    //     isOpen: { visible: boolean; posX: number; posY: number };
    //     setDim?: (width: number) => void;
    //     handleClose: () => void;

  const [options, setOptions] = useState(null);
  const childRef = useRef(null);

  useEffect(() => {
    setOptions(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        props.handleClose();
      }
    };

    if (options && options.visible) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [options, props.handleClose]);

  const twStyles = {
    backdrop: `transition ${
      options && options.visible ? 'opacity-100' : 'opacity-0'
    } z-50 fixed flex min-h-screen min-w-screen top-0 left-0 right-0 bottom-0 oadd sm:p-8 p-4 rounded`,
    MenuWrapper: `transition ${
      options && options.visible ? 'scale-100' : 'scale-75'
    } bg-white absolute shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] rounded`
  };

  return ReactDOM.createPortal(
    options && options.visible && (
      React.createElement('div', {
        className: twStyles.backdrop,
        id: 'displayModal',
        onClick: (e) => {
          e.stopPropagation();
          props.handleClose();
        }
      },
      React.createElement('div', {
        ref: childRef,
        style: {
          top: `${options.posY}px`,
          left: `${options.posX}px`
        },
        className: twStyles.MenuWrapper,
        onClick: (e) => e.stopPropagation()
      }, props.children))
    ),
    document.getElementById('root')
  );
};

export default MenuWrapper;
