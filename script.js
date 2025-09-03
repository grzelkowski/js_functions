// for single target
function observe_target(options) {
    const container_selector = options.container_selector;
    const target_selector = options.target_selector;
    const when_loaded = options.when_loaded;
    //get all containers
    const all_containers = document.querySelectorAll(container_selector);
    //start observe for each element
    all_containers.forEach(container => {
        //if target already exists, call callback and skip observer
        if (container.querySelector(target_selector)) {
            when_loaded(container);
            return;
        }
        //create observer to listen for DOM changes
        const observer = new MutationObserver((mutations, obs) => {
            //start function if target element appear
            if (container.querySelector(target_selector)) {
                when_loaded(container);
                obs.disconnect();// stop observing
            }
        });
        observer.observe(container, {
            childList: true, //listen add or remove child element
            subtree: true //listen whole subtree
        });
    });
}
function observe_container(){
    function when_loaded(container) {
        console.log('when_loaded');
        container.classList.add('active');
    }
    observe_target({
        container_selector: '.container',
        target_selector: '.item',
        when_loaded: when_loaded
    })
}
document.addEventListener('DOMContentLoaded', function () {
  observe_container();
});

//for multiple targets
function observe_multiple_targets(options) {
  const container_selector = options.container_selector;
  const target_selector = options.target_selector;
  const target_min_count = options.target_min_count || 1; //minimum of elements that needs to appear
  const when_loaded = options.when_loaded;

  const all_containers = document.querySelectorAll(container_selector);

  all_containers.forEach(container => {
    //immediate check
    const initial_targets = container.querySelectorAll(target_selector);
    if (initial_targets.length >= target_min_count) {
      when_loaded(container);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const targets = container.querySelectorAll(target_selector);
      if (targets.length >= target_min_count) {
        when_loaded(container);
        obs.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true
    });
  });
}

function wait_for_targets() {
  function when_loaded(container) {
    const items = container.querySelectorAll('.item');
    if (items.length === 2) {
      container.classList.add('active');
    }
  }
  observe_multiple_targets({
    container_selector: '.container',
    target_selector: '.item',
    target_min_count: 2,
    when_loaded: when_loaded
  });
}

document.addEventListener('DOMContentLoaded', function () {
  wait_for_targets();
});