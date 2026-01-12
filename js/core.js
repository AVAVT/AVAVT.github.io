const init = async function () {
  const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  const html = data.items
    .map((item) =>
      template
        .replace(/%CATEGORY%/g, item.category)
        .replace(/%LINK%/g, item.link)
        .replace(/%TITLE%/g, item.title)
        .replace(/%PREVIEW%/g, item.preview)
        .replace(/%DESCRIPTION%/g, item.description)
        .replace(
          /%PLATFORMS%/g,
          item.platforms
            ? item.platforms
                .map((platform) => `<i class="fab fa-${platform}"></i>`)
                .join("\n")
            : ""
        )
    )
    .join("\n");

  document.getElementById("works").innerHTML = html;
  

  const tabs = document.querySelectorAll("#works_container .works_tab");
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");

      document
        .querySelectorAll(".works_item")
        .forEach((i) => i.classList.remove("hide"));

      if (category !== "all") {
        document
          .querySelectorAll(`.works_item:not(.category_${category})`)
          .forEach((i) => i.classList.add("hide"));
      }
    });
  }
};

const template = `
<li class="works_item category_%CATEGORY%">
  <div>
    <a href="%LINK%" title="%TITLE%" target="_blank" class="work_thumbnail rounded-md block w-full h-[340px] overflow-hidden">
      <div class="w-full h-full bg-cover bg-center" style="background-image: url('%PREVIEW%');"></div>
    </a>
  </div>
  <div>
  <div class="flex mb-2 justify-between items-center">
    <h3 class="text-xl">
      <a href="%LINK%" title="%TITLE%" target="_blank">%TITLE%</a>
    </h3>
    <a href="%LINK%" title="%TITLE%" target="_blank" class="text-xs">
        %PLATFORMS%
      </a>
    </div>
    %DESCRIPTION%
  </div>
</li>
`;

window.addEventListener("load", () => init().catch((e) => console.error(e)));
