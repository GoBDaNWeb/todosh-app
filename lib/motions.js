const slideIn = {
    before: {
        y: '-150vh',
        opacity: 0,
    },
    in: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            damping: 100,
            stiffness: 400,
        },
    },
    after: {},
}
const dropIn = {
    before: {
        y: '-100vh',
        opacity: 0,
    },
    in: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 25,
            stiffness: 400,
        },
    },
    after: {
        y: '100vh',
        opacity: 0,
    },
}
const drop = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { 
            stiffness: 500, 
            velocity: -100, 
            type: 'spring',
            damping: 25 
        }
        }
      },
      closed: {
        y: -500,
        opacity: 0,
        transition: {
          y: { stiffness: 500 },
          damping: 25,
        }
      }
}
const slideRTL = {
    before: {
        x: '80vw',
        opacity: 0
    },
    in: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            damping: 75,
            stiffness: 600,
        },
    },
    after: {
        x: '80vw',
        opacity: 0,
        transition: {
            duration: 1.2,
        },
    }
}
const slideLTR = {
    before: {
        x: '-80vw',
        opacity: 0
    },
    in: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            damping: 75,
            stiffness: 1000,
        },
    },
    after: {
        x: '-80vw',
        opacity: 0,
        transition: {
            duration: 1.2,
        },
    }
}

export {slideIn, dropIn, drop, slideLTR, slideRTL}