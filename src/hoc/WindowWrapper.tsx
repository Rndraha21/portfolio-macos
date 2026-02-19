import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowStore from "@store/window";
import { useLayoutEffect, useRef, type ComponentType } from "react";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: string,
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector(".window-header");

      const [instance] = Draggable.create(el, {
        trigger: header,
        dragClickables: true,
        allowEventDefault: true,
        clickableTest: (el) => el.tagName.toLowerCase() === "input",
        onPress: () => {
          focusWindow(windowKey);
        },
      });

      return () => instance.kill();
    }, []);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
