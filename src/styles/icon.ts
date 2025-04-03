const Star = (color?: string): string => {
  if (!color) color = "#FFC120";
  color =
    color?.indexOf("#") === -1 ? color : color?.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='13' fill='none' viewBox='0 0 14 13'%3E%3Cpath fill='%23${color}' fill-rule='evenodd' d='M7.715.431C7.581.167 7.304 0 7 0s-.58.167-.715.431L4.554 3.836l-3.872.55c-.3.042-.55.246-.643.527-.094.28-.015.587.202.793l2.8 2.648-.66 3.741c-.051.29.072.584.317.757.246.173.571.196.84.059L7 11.144l3.462 1.767c.269.137.594.114.84-.059.245-.173.369-.466.317-.757l-.66-3.741 2.8-2.648c.217-.206.296-.513.202-.793-.094-.28-.343-.485-.643-.528l-3.872-.549L7.716.431z' clip-rule='evenodd'/%3E%3C/svg%3E"`;
};

const Search = (color?: string): string => {
  color =
    color?.indexOf("#") === -1 ? color : color?.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'%3E%3Cpath stroke='%23${color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M8.156 14.063c3.262 0 5.906-2.645 5.906-5.907S11.418 2.25 8.157 2.25c-3.262 0-5.906 2.644-5.906 5.906 0 3.262 2.644 5.906 5.906 5.906zM12.332 12.333l3.417 3.417'/%3E%3C/svg%3E"`;
};

const Map = (color?: string): string => {
  color =
    color?.indexOf("#") === -1 ? color : color?.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='32px' width='32px' version='1.1' id='Capa_1' viewBox='0 0 500.143 500.143' xml:space='preserve'%3E%3Cg%3E%3Cpath style='fill:%23${color};' d='M494.705,109.571l-161.287-56.9c-0.244-0.089-0.496-0.106-0.74-0.171 c-0.341-0.089-0.667-0.187-1.008-0.228c-0.325-0.041-0.642-0.016-0.959-0.016c-0.317,0-0.634-0.016-0.959,0.016 c-0.341,0.041-0.675,0.146-1.008,0.228c-0.244,0.065-0.504,0.081-0.74,0.171L169.416,108.62L10.827,52.671 c-2.487-0.886-5.243-0.496-7.397,1.024S0,57.695,0,60.328v322.583c0,3.447,2.178,6.519,5.422,7.665l161.295,56.9 c0.041,0.016,0.089,0.008,0.138,0.024c0.829,0.276,1.691,0.439,2.569,0.439s1.74-0.163,2.569-0.439 c0.041-0.016,0.089-0.008,0.138-0.024l158.597-55.949l158.58,55.949c0.878,0.309,1.796,0.463,2.707,0.463 c1.658,0,3.3-0.512,4.69-1.496c2.162-1.528,3.438-3.999,3.438-6.633V117.237C500.127,113.79,497.948,110.717,494.705,109.571z M16.249,71.822l145.038,51.161v305.35L16.249,377.164C16.249,377.164,16.249,71.822,16.249,71.822z M177.544,122.983 l145.038-51.161v305.342l-145.038,51.169V122.983z M483.87,428.333l-145.03-51.169V71.822l145.03,51.161V428.333z'/%3E%3C/g%3E%3Cscript xmlns=''/%3E%3C/svg%3E"`;
};

const HambugerMenu = (color?: string): string => {
  color =
    color?.indexOf("#") === -1 ? color : color?.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30PX' height='30px' viewBox='0 0 72 72' id='emoji'%3E%3Cg id='color'/%3E%3Cg id='hair'/%3E%3Cg id='skin'/%3E%3Cg id='skin-shadow'/%3E%3Cg id='line'%3E%3Cline x1='16' x2='56' y1='26' y2='26' fill='none' stroke='%23${color}' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'/%3E%3Cline x1='16' x2='56' y1='36' y2='36' fill='none' stroke='%23${color}' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'/%3E%3Cline x1='16' x2='56' y1='46' y2='46' fill='none' stroke='%23${color}' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'/%3E%3C/g%3E%3Cscript xmlns=''/%3E%3C/svg%3E"`;
};

const SVG = {
  Star,
  Search,
  Map,
  HambugerMenu,
};

export default SVG;
