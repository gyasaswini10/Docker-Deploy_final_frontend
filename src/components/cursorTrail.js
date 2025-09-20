// src/cursorTrail.js

export const createCursorTrail = () => {
    const cursorDotContainer = document.createElement('div');
    cursorDotContainer.style.position = 'absolute';
    cursorDotContainer.style.pointerEvents = 'none';
    document.body.appendChild(cursorDotContainer);
  
    // Track mouse movement
    const onMouseMove = (event) => {
      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = 'white';
      dot.style.transition = 'transform 0.1s ease-out';
      dot.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`; // Center the dot
  
      // Append the dot to the container
      cursorDotContainer.appendChild(dot);
  
      // Remove the dot after a short delay (creating the "trail" effect)
      setTimeout(() => {
        dot.remove();
      }, 200);
    };
  
    // Add event listener for mouse move
    window.addEventListener('mousemove', onMouseMove);
  
    // Cleanup: remove event listener when component is unmounted
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cursorDotContainer.remove();
    };
  };
  