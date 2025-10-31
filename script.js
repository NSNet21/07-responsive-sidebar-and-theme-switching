// toggle menu button 1
const toggleMenu = document.getElementById("toggleMenu");

// toggle menu button 2
const sidebarToggle = document.getElementById("sidebarToggle");
const sideBar = document.getElementById("sideBar");
const stIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");
const link = document.getElementsByClassName("link");

/* click the icon to toggle between expanded and collapsed state */

toggleMenu.addEventListener("click", () => {
  const isRotate = toggleMenu.style.transform === "rotate(180deg)";
  const isUpHight = toggleMenu.style.lineHeight === "32px";
  const isCollapsed = sideBar.classList.contains("collapsed");

  if (!isRotate && !isUpHight & !isCollapsed) {
    toggleMenu.style.transform = "rotate(-180deg) translateX(-2px)";
    toggleMenu.style.lineHeight = "32px";
    sideBar.classList.add("collapsed");
  } else {
    toggleMenu.style.transform = "";
    toggleMenu.style.lineHeight = "";
    sideBar.classList.remove("collapsed");
  }
});

sidebarToggle.addEventListener("click", () => {
  const isCollapsed = sideBar.classList.contains("collapsed");
  if (!isCollapsed) {
    sideBar.classList.add("collapsed");
    toggleMenu.style.transform = "rotate(-180deg) translateX(-2px)";
    toggleMenu.style.lineHeight = "32px";
  } else {
    sideBar.classList.remove("collapsed");
    toggleMenu.style.transform = "";
    toggleMenu.style.lineHeight = "";
  }
});

/* click on the search icon on collapsed state to move to expanded state
and focus on search input  */

stIcon.addEventListener("click", () => {
  const isCollapsed = sideBar.classList.contains("collapsed");
  if (isCollapsed) {
    sideBar.classList.remove("collapsed");
    toggleMenu.style.transform = "";
    toggleMenu.style.lineHeight = "";

    setTimeout(() => {
      searchInput.focus();
    }, 500);
  }
});

/* chang background-color & color on link when click */

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function () {
    const currentActive = link[i].classList.contains("active");
    if (!currentActive) {
      // ลบ active ทั้งหมดก่อน
      for (let j = 0; j < link.length; j++) {
        link[j].classList.remove("active");
      }
      // เพิ่ม active ให้ตัวที่ถูกคลิก
      this.classList.add("active");
    } else {
      return;
    }
  });
}

/* get theme toggle button & current theme for html attribute */

const themeToggleBtn = document.getElementById("themeToggle");
const currentTheme = document.documentElement.getAttribute("data-theme");
const savedTheme = localStorage.getItem("theme");
const themeToggleIDC = document.getElementById("TTIDC");
const themeStateIDC = document.getElementById("TSTDC");
const iconTheme = document.getElementById("iconTheme");

/* if there's saved theme use that theme if not use the theme in html tag (inline code) if not again
use default as light (running by JavaScript code) */

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") {
    themeToggleIDC.classList.add("dark-mode-on");
    themeStateIDC.textContent = "on";
    iconTheme.classList.remove("bxs-sun");
    iconTheme.classList.add("bxs-moon");
  } else {
    themeToggleIDC.classList.remove("dark-mode-on");
    themeStateIDC.textContent = "off";
    iconTheme.classList.remove("bxs-moon");
    iconTheme.classList.add("bxs-sun");
  }
}

/* if there's no theme set, use the light theme */

if (!currentTheme) {
  document.documentElement.setAttribute("data-theme", "light");
}

/* theme toggle button */

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const isDark = current === "dark" ? true : false;
  const nextTheme = current === "light" ? "dark" : "light";
  let iconThemeClass = iconTheme;
  themeToggleIDC.classList.toggle("dark-mode-on");
  if (!isDark) {
    themeStateIDC.textContent = "on";
    document.documentElement.setAttribute("data-theme", nextTheme);
    iconThemeClass.classList.add("icon-fade-out");
    localStorage.setItem("theme", nextTheme);
    setTimeout(() => {
      // สลับ icon ตอน fade หายไป
      iconThemeClass.classList.toggle("bxs-sun");
      iconThemeClass.classList.toggle("bxs-moon");
      iconThemeClass.classList.remove("icon-fade-out");
    }, 300);
  } else {
    themeStateIDC.textContent = "off";
    document.documentElement.setAttribute("data-theme", nextTheme);
    iconThemeClass.classList.add("icon-fade-out");
    localStorage.setItem("theme", nextTheme);
    setTimeout(() => {
      // สลับ icon ตอน fade หายไป
      iconThemeClass.classList.toggle("bxs-sun");
      iconThemeClass.classList.toggle("bxs-moon");
      iconThemeClass.classList.remove("icon-fade-out");
    }, 300);
  }
});

/* closing sidebar when click on the another area outside the sidebar on screen-width is less than
769px */

document.addEventListener("click", (e) => {
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const clickedInsideSidebar = sideBar.contains(e.target);
  const clickedToggleBtn = toggleMenu.contains(e.target);
  const clickedToggleBtn2 = sidebarToggle.contains(e.target);

  if (isSmallScreen && !sideBar.classList.contains("collapsed")) {
    if (!clickedInsideSidebar && !clickedToggleBtn && !clickedToggleBtn2) {
      toggleMenu.style.transform = "rotate(-180deg) translateX(-2px)";
      toggleMenu.style.lineHeight = "32px";
      sideBar.classList.add("collapsed");
    }
  }
});
