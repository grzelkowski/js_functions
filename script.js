function observe_element(options) {
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
    observe_element({
        container_selector: '.container',
        target_selector: '.item',
        when_loaded: when_loaded
    })
}
$(document).ready(function(){
     observe_container()
});