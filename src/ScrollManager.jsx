import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap"

export const ScrollManager = (props) => {
 const { section, onSectionChange } = props;

 const data = useScroll();
 const lastScroll = useRef(0);
 const isAnimating = useRef(false);

 data.fill.classList.add("fix");
 useEffect(() => {
  function onScroll(event) {
    if (isAnimating.current) {
      return ;
    }
    isAnimating.current = true;
    if (event.deltaY < 0)
      {
        onSectionChange((section) => section > 0 ? section - 1 : 0);
      }
      else if (event.deltaY > 0)
      {
        onSectionChange((section) => section === 4 ? 4 : section + 1);
      }
  }
  window.addEventListener('wheel', onScroll);
  return () => window.removeEventListener('wheel', onScroll);
}, []);


  

 useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
 }, [section]);

 const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      handleUpClick();
    } else if (event.key === 'ArrowDown') {
      handleDownClick();
    }
 };

 const handleUpClick = () => {
    onSectionChange((section) => section > 0 ? section - 1 : 0);
 };

 const handleDownClick = () => {
    onSectionChange((section) => section === 4 ? 4 : section + 1);
 };

 useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
 }, []);

 return null;
};