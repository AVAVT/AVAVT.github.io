var TechKidsApp = (function ($, undefined) {
	var init = function () {
		if (TechKidsApp.scrollSpy) {
			TechKidsApp.scrollSpy.init();
		}

		$.getJSON('./data.json')
			.then(data => {
				const html = data.items.map(item => template
					.replace(/%CATEGORY%/g, item.category)
					.replace(/%LINK%/g, item.link)
					.replace(/%TITLE%/g, item.title)
					.replace(/%PREVIEW%/g, item.preview)
					.replace(/%DESCRIPTION%/g, item.description)
					.replace(/%PLATFORMS%/g, item.platforms
						? item.platforms.map(platform => `<i class="fab fa-${platform}"></i>`).join('\n')
						: ''
					)
				).join('\n')

				$('#works').html(html);
			});

		$('#works_container').on('click', '.works_tab', function (e) {
			$('.works_tab').removeClass('active');
			$(this).addClass('active');

			const category = $(this).attr('data-category');
			console.log(category);
			if (category === 'all') {
				$('.works_item').removeClass('hide');
			}
			else {
				$(`.works_item.category_${category}`).removeClass('hide');
				$(`.works_item:not(.category_${category})`).addClass('hide');
			}
		});
	}

	return {
		init: init
	}

}(jQuery));

const template = `<li class="row works_item category_%CATEGORY%">
              <div class="col-sm-4">
                <a href="%LINK%" title="%TITLE%" target="_blank" class="work_thumbnail fade_scale">
                  <img src="%PREVIEW%" />
                </a>
              </div>
              <div class="col-sm-8 fade_left">
                <h3>
                  <a href="%LINK%" title="%TITLE%" target="_blank">%TITLE%</a>
								</h3>
								%DESCRIPTION%
                <p>
                  <a href="%LINK%" title="%TITLE%" target="_blank">
                    %PLATFORMS%
                  </a>
                </p>
              </div>
						</li>
						<hr>`;

$(document).ready(function () {
	TechKidsApp.init();
});