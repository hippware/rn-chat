// @flow

// Link to the official rn-chat UI Kit can be found here:
// https://github.com/hippware/rn-chat/wiki/Hippware-Resources-(tinyrobot)

// aka Coral Pink
// #FE5C6C
export const PINK = 'rgb(253,95,108)';

// aka Night Shadz
// #B53E51
export const DARK_RED = 'rgb(181,62,81)';

// aka Finn
// #633E5A
export const PURPLE = 'rgb(99,62,90)';

// aka Martinique
// #3F324D
export const DARK_PURPLE = 'rgb(63,50,77)';

// aka Soft Blue
// #70B0E1
export const LIGHT_BLUE = 'rgb(112,176,225)';

// aka Summer Sky
// #449DE1
export const BLUE = 'rgb(68,157,225)';

// #F2F3F5
export const LIGHT_GREY = 'rgb(242,243,245)';

// #D4D4D4
export const GREY = 'rgb(212,212,212)';

// #9B9B9B
export const DARK_GREY = 'rgb(155,155,155)';

// aka Pale Yellow
// #449DE1
export const LIGHT_YELLOW = 'rgb(68,157,225)';

// #72646D
export const PURPLISH_GREY = 'rgb(114,100,109)';

// #FFFFFF
export const WHITE = 'rgb(255,255,255)';

export const hexToRgba = (hex: string, alpha: number): string => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = `0x${c.join('')}`;
        const rgb = [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
        return `rgba(${rgb},${alpha})`;
    }
    throw new Error('Bad Hex');
};

export const addAlpha = (rgb: string, alpha: number): string => {
    const val = rgb.substring(rgb.indexOf('(') + 1, rgb.indexOf(')'));
    return `rgba(${val}, ${alpha})`;
};

// #FB5263
export const COVER_PINK = 'rgb(251, 82, 99)';
export const COVER_PINK_MASK = addAlpha(COVER_PINK, 0.58);

// #59B0F2
export const COVER_BLUE = 'rgb(89, 176, 242)';
export const COVER_BLUE_MASK = addAlpha(COVER_BLUE, 0.61);

// #C55CAC
export const COVER_PURPLE = 'rgb(197, 92, 172)';
export const COVER_PURPLE_MASK = addAlpha(COVER_PURPLE, 0.7);

// #3ED095
export const COVER_GREEN = 'rgb(62, 208, 149)';
export const COVER_GREEN_MASK = addAlpha(COVER_GREEN, 0.66);

// export const backgroundColorDay = 'rgba(241,242,244,0.85)';
export const backgroundColorDay = addAlpha(LIGHT_GREY, 0.85);

export const backgroundColorNight = 'rgba(49,37,62,0.90)';

export const navBarTextColorDay = PURPLE;

export const navBarTextColorNight = 'rgb(255,255,255)';

export const navBarBackgroundColorDay = 'rgba(255,255,255,0)';

export const navBarBackgroundColorNight = 'rgb(45,33,55)';

export const backgroundColorCardDay = 'rgba(255,255,255,1)';

export const backgroundColorCardNight = PURPLE;
