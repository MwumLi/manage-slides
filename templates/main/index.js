import './index.less';

const { appName, manifests, title } = window.__APP;
document.title = appName;
document.querySelector(".title").textContent = title || `${appName}'s Slides`;

const colorsMap = {
  red: "#f44336",
  pink: "#e91e63",
  blank: "#374046",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  lightBlue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
  brown: "#795548",
  grey: "#9e9e9e",
  blueGrey: "#607d8b"
};
const colors = Object.values(colorsMap);
const ppts = manifests || [];
ppts.forEach((item, i) => {
  item.color = colors[i % colors.length];
});

document.querySelector(".slide-wrap").innerHTML = generateList(ppts).join('\n');

function generateList(ppts) {
  return ppts.map(item => {
    const {
      color,
      title,
      href,
      desc
    } = item;
    return `
        <div div class="slide" style="background: ${color}" >
          <a href="${href}" title="${desc}" target="_blank"> </a>
          ${title}
        </div>
    `;
  })
}