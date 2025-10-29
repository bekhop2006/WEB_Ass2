$(document).ready(function(){
    console.log("jQuery is ready!");

    // Scroll Progress Bar (Task 4)
    const updateProgress = () => {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $('#scroll-progress .bar').css('width', progress + '%');
    };
    $(window).on('scroll resize', updateProgress);
    updateProgress();

    // Toast helper (Task 7)
    function showToast(message, duration=2500){
        const $toast = $('<div class="toast-item"></div>').text(message);
        $('#toast-container').append($toast);
        setTimeout(() => { $toast.fadeOut(400, () => $toast.remove()); }, duration);
    }

    // News search: realtime filter + autocomplete + highlighting (Tasks 1-3)
    (function setupNewsSearch(){
        const $search = $('#news-search');
        if ($search.length === 0) return; // only on news page

        const $articles = $('.news-article-item');
        const $suggestions = $('#search-suggestions');

        const titles = $articles.map(function(){ return $(this).find('h2').text().trim(); }).get();

        function clearHighlights(){
            $articles.find('h2, p').each(function(){
                const original = $(this).html().replace(/<mark class=\"search-highlight\">|<\/mark>/g, '');
                $(this).html(original);
            });
        }

        function highlight(term){
            if(!term) return;
            const regex = new RegExp('('+ $.escapeSelector(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +')', 'ig');
            $articles.find('h2, p').each(function(){
                const html = $(this).html();
                $(this).html(html.replace(regex, '<mark class="search-highlight">$1</mark>'));
            });
        }

        function filterList(term){
            const q = term.toLowerCase();
            $articles.each(function(){
                const text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(q) !== -1);
            });
        }

        function buildSuggestions(term){
            $suggestions.empty();
            if(!term){ $suggestions.hide(); return; }
            const q = term.toLowerCase();
            const top = titles.filter(t => t.toLowerCase().includes(q)).slice(0,8);
            if(top.length === 0){ $suggestions.hide(); return; }
            top.forEach(t => {
                $('<li class="list-group-item"></li>').text(t).appendTo($suggestions);
            });
            $suggestions.show();
        }

        $('#clear-search').on('click', function(){
            $search.val('');
            clearHighlights();
            filterList('');
            $suggestions.hide();
        });

        $search.on('keyup input', function(){
            const term = $(this).val();
            clearHighlights();
            filterList(term);
            buildSuggestions(term);
            highlight(term);
        });

        $suggestions.on('click', '.list-group-item', function(){
            const val = $(this).text();
            $search.val(val).trigger('input');
            $suggestions.hide();
        });

        // Hide suggestions on outside click
        $(document).on('click', function(e){
            if(!$(e.target).closest('#news-search, #search-suggestions').length){
                $suggestions.hide();
            }
        });
    })();

    // Animated number counters (Task 5)
    (function setupCounters(){
        const $counters = $('.counter[data-target]');
        if($counters.length === 0) return;
        function animate($el){
            const target = parseInt($el.data('target'), 10) || 0;
            const durationMs = 1500;
            const start = performance.now();
            function step(ts){
                const progress = Math.min(1, (ts - start)/durationMs);
                const value = Math.floor(progress * target);
                $el.text(value.toLocaleString());
                if(progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }
        // Trigger on visible
        function check(){
            $counters.each(function(){
                const $el = $(this);
                if($el.data('counted')) return;
                const top = $el.offset().top;
                const winTop = $(window).scrollTop();
                const winBottom = winTop + $(window).height();
                if(top < winBottom){
                    $el.data('counted', true);
                    animate($el);
                }
            });
        }
        $(window).on('scroll resize', check);
        check();
    })();

    // Loading spinner on submit (Task 6) + Toast (Task 7)
    (function setupContactSubmit(){
        const $form = $('#contact-form');
        if($form.length === 0) return;
        const $btn = $('#contact-submit');
        $form.on('submit', function(e){
            e.preventDefault();
            if($btn.hasClass('btn-loading')) return;
            const original = $btn.html();
            $btn.data('original', original);
            $btn.addClass('btn-loading').prop('disabled', true).html('<span class="spinner"></span>Please wait…');
            setTimeout(function(){
                $btn.removeClass('btn-loading').prop('disabled', false).html(original);
                showToast('Form submitted successfully');
            }, 1800);
        });
    })();

    // Copy to clipboard (Task 8) + Toast
    (function setupCopy(){
        $(document).on('click', '#copy-snippet', function(){
            const targetSel = $(this).data('copy-target');
            const text = $(targetSel).text();
            navigator.clipboard.writeText(text).then(() => {
                const $btn = $('#copy-snippet');
                const original = $btn.text();
                $btn.html('✔ Copied');
                showToast('Copied to clipboard!');
                setTimeout(()=> $btn.html(original), 1200);
            });
        });
    })();

    // Lazy loading images (Task 9)
    (function setupLazy(){
        const $lazy = $('img.lazy[data-src]');
        if($lazy.length === 0) return;
        function loadInView(){
            const winTop = $(window).scrollTop();
            const winBottom = winTop + $(window).height();
            $lazy.each(function(){
                const $img = $(this);
                if($img.data('loaded')) return;
                const top = $img.offset().top;
                if(top < winBottom + 150){
                    const src = $img.attr('data-src');
                    if(src){ $img.attr('src', src); }
                    $img.data('loaded', true).removeClass('lazy');
                }
            });
        }
        $(window).on('scroll resize', loadInView);
        loadInView();
    })();
});


