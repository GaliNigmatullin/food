function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs
    
    const tabs = document.querySelectorAll(tabsSelector),  // название таба справо
    tabsContent = document.querySelectorAll(tabsContentSelector), // картинка и описание таба
    tabsParent = document.querySelector(tabsParentSelector); // родительский блок
      
    function hideTabContent (){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);

    }   

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; 

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;