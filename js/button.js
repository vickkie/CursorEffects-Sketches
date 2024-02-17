const buttons = document.querySelectorAll(".btn-link");

function loadAnimation(button) {
  const tl = gsap.timeline();
  tl.set(
    button,
    {
      willChange: "transform",
    },
    0
  );

  tl.from(
    button,
    {
      opacity: 0,
      duration: 0.1,
    },
    0
  );

  tl.from(
    button,
    {
      scaleX: 0.3,
      duration: 1.6,
      ease: "elastic.out(0.4, 0.3)",
      force3D: true,
    },
    0
  );
}

function hoverAnimation(button) {
  const t1 = gsap.timeline();
  const ripple = button.querySelectorAll(".btn-ripple");
  const title = button.querySelector(".btn-title");

  t1.set(ripple, {
    display: "block",
  });
  t1.set(button, {
    willChange: "transform",
    scale: 1,
  });
  t1.to(
    button,
    {
      scaleX: 1.03,
      scaleY: 0.98,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
      force3D: !0,
    },
    0
  );
  t1.set(button, {
    willChange: "auto",
  });

  t1.set(ripple, {
    willChange: "transform",
  });
  t1.fromTo(
    ripple,
    {
      xPercent: -100,
    },
    {
      xPercent: 0,
      stagger: {
        each: 0.2,
      },
      duration: 1,
      ease: "expo.out",
      force3D: !0,
    },
    0
  );
  t1.set(ripple, {
    willChange: "auto",
  });

  t1.from(
    title,
    {
      opacity: 0,
      duration: 0.2,
    },
    0.2
  );
}

function hoverAnimationReset(button) {
  const t2 = gsap.timeline();
  const ripple = button.querySelectorAll(".btn-ripple");

  t2.set(
    button,
    {
      scaleX: 1.03,
      scaleY: 0.98,
      willChange: "transform",
    },
    0
  );
  t2.to(
    button,
    {
      scaleX: 1,
      scaleY: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1,
      force3D: !0,
    },
    0
  );
  t2.set(button, {
    willChange: "auto",
  });

  t2.set(
    ripple,
    {
      willChange: "transform",
      xPercent: 0,
    },
    0
  );
  t2.to(
    ripple,
    {
      xPercent: 100,
      stagger: {
        each: 0.2,
        from: "end",
      },
      duration: 1,
      ease: "expo.out",
      immediateRender: !1,
      force3D: !0,
    },
    0
  );
  t2.set(ripple, {
    willChange: "auto",
  });
}

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => hoverAnimation(button));
  button.addEventListener("mouseleave", () => hoverAnimationReset(button));
});

window.addEventListener("load", () => {
  buttons.forEach((button) => loadAnimation(button));
});
