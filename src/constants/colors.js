// @flow

// Link to the official rn-chat UI Kit can be found here:
// https://github.com/hippware/rn-chat/wiki/Hippware-Resources-(tinyrobot)

// aka Coral Pink
// rgb(253,95,108)
export const PINK = '#FE5C6C';

// aka Night Shadz
// rgb(181, 62, 81)
export const DARK_RED = '#B53E51';

// aka Finn
// rgb(63,50,77)
export const PURPLE = '#633E5A';

// aka Martinique
// rgb(63, 50, 77)
export const DARK_PURPLE = '#3F324D';

// aka Soft Blue
// rgb(112, 176, 225)
export const LIGHT_BLUE = '#70B0E1';

// aka Summer Sky
// rgb(68, 157, 225)
export const BLUE = '#449DE1';

// rgb(242, 243, 245)
export const LIGHT_GREY = '#F2F3F5';

// rgb(212, 212, 212)
export const GREY = '#D4D4D4';

// rgb(155, 155, 155)
export const DARK_GREY = '#9B9B9B';

// aka Pale Yellow
// rgb(68, 157, 225)
export const LIGHT_YELLOW = '#449DE1';

// rgb(114, 100, 109)
export const PURPLISH_GREY = '#72646D';

// rgb(255, 255, 255)
export const WHITE = '#FFFFFF';

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
// rgb(251, 82, 99)
export const COVER_PINK = '#FB5263';
export const COVER_PINK_MASK = hexToRgba(COVER_PINK, 0.58);

// rgb(89, 176, 242)
export const COVER_BLUE = '#59B0F2';
export const COVER_BLUE_MASK = hexToRgba(COVER_BLUE, 0.61);

// rgb(197, 92, 172)
export const COVER_PURPLE = '#C55CAC';
export const COVER_PURPLE_MASK = hexToRgba(COVER_PURPLE, 0.7);

// rgb(62, 208, 149)
export const COVER_GREEN = '#3ED095';
export const COVER_GREEN_MASK = hexToRgba(COVER_GREEN, 0.66);
