import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedReactHooksDemo = () => {
	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
  // Create reference to store the Typed instance itself
	const typed = useRef(null);

    useEffect(() => {
    const options = {
    	strings: [
        'create a new account',
        'or',
        'sign in to an existing account'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      startDelay: 500,
    };
    
    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
    
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [])

  return (
    <div >
      <span className="text-4xl text-white text-shadow" style={{ whiteSpace: 'pre' }} ref={el} />
    </div>
  );
}

export default TypedReactHooksDemo