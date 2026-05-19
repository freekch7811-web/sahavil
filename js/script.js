// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#header').outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('#header').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('#header').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;
}

// slide banner------------
$(function () { let current = 0; const slide = $(".slide li"); const total = slide.length; slide.hide(); slide.eq(0).show(); setInterval(function () { let next = (current + 1) % total; slide.eq(current).fadeOut(1000); slide.eq(next).fadeIn(1000); current = next; }, 3000); });



// sub4 공지사항-----------
const data = [
    {
        id: 100,
        title: '중요공지 | Christmas 이벤트',
        date: '2026.12.25',
        content: 'Christmas 이벤트 진행',
        image: '/images/event.png',
        fixed: true
    },

    {
        id: 2,
        title: '신규 메뉴 출시',
        date: '2026.12.20',
        content: '신규 메뉴 출시관련 이벤트',
        image: '/images/menu.png',
        fixed: false
    },

    {
        id: 1,
        title: 'ort special 메뉴 출시',
        date: '2026.05.18',
        content: '떡볶이, ort 라면, 만두 라면',
        image: '/images/detail.png',
        fixed: false
    }
];

function sortNotices(arr){
    return [...arr].sort((a,b)=>{
        if(a.fixed && !b.fixed) return -1;
        if(!a.fixed && b.fixed) return 1;
        return b.date.localeCompare(a.date);
    });
}

let page = 1;
let per = 10;
let filtered = sortNotices(data);

function render(){

    const s = (page-1)*per;

    rows.innerHTML = filtered.slice(s,s+per).map((n,idx)=>`
        <tr onclick="openDetail(${n.id})" class="${n.fixed?'fixed-row':''}">
            <td>${n.fixed ? '공지' : filtered.length-(s+idx)}</td>
            <td>${n.fixed ? '📌 '+n.title : n.title}</td>
            <td>${n.date}</td>
        </tr>
    `).join('');

    const pages = Math.ceil(filtered.length/per);

    pager.innerHTML = Array.from({length:pages},(_,i)=>
        `<button onclick="go(${i+1})">${i+1}</button>`
    ).join('');
}

function go(p){
    page = p;
    render();
}

function search(){

    const v = q.value.toLowerCase();

    filtered = sortNotices(
        data.filter(x=>
            x.title.toLowerCase().includes(v) ||
            x.content.toLowerCase().includes(v)
        )
    );

    page = 1;
    render();
}

function openDetail(id){

    const i = filtered.findIndex(x=>x.id===id);
    const n = filtered[i];

    listView.classList.add('hidden');
    detailView.classList.remove('hidden');

    dtitle.textContent = n.title;
    ddate.textContent = n.date;
    dcontent.textContent = n.content;
    dimg.src = n.image;

    if(i < filtered.length - 1){
        prev.innerHTML = `이전글 | ${filtered[i + 1].title}`;
        prev.style.cursor = 'pointer';
        prev.onclick = () => openDetail(filtered[i + 1].id);
    } else {
        prev.innerHTML = '';
        prev.onclick = null;
    }

    if(i > 0){
        next.innerHTML = `다음글 | ${filtered[i - 1].title}`;
        next.style.cursor = 'pointer';
        next.onclick = () => openDetail(filtered[i - 1].id);
    } else {
        next.innerHTML = '';
        next.onclick = null;
    }
}

function backList(){
    detailView.classList.add('hidden');
    listView.classList.remove('hidden');
}

render();

// -------------------------------------