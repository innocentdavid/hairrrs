1.-----im dieing........
nobody tell  me sey programming hard like this...


2.-----we have about 10 layouts in Ohyanga.
layout1 - profile
layout2 - interractive container
layout3 - features
layout4 - empty
layout5 - filter
layout6 - soldby
layout7 - business profile, settings,
layout8 - add product, jobvacancy and articles
layout9 - go premium

wouldve used commentings to set boundaries in the codes for which belongs to which.. but i realised that too late.. it wasnt needed anymore cos i carefully set all codes so you wont get confused.. so please exercise patience to master the environments of the codes.. #igochoptireonceifinishmypartcosidonlekpa
(please copy the directory instead so the infos can still be here for you when you need them)




3.-----ON THE BAR CHART:
to be able to control the bars to move up and down. you will have to pick the

.a1{
    margin-left: 0px;
    margin-right: 0px;
    height: 250px;
    width: 38px;
    background: linear-gradient(#f40053,#fa236b,white);
    border-radius: 25px 25px 0px 0px;
    margin-top: 40px; --------------------------------> margin-top: just change the pixels to the numbers and
                                                        see it move up and down. so i believe with js or phyton. you can make them move automatically by units.
                                                        and controlled by engagements by the users.

                                                        if your next reply is im not doing it right. just come and chuk me knife cos programming is DEATH itself. i rather die by someone stranging me to death than for words,numbers and sentences to strangle the living hell out of my gentle soul.lol....

                                                        also the margin-top least lowest height is margin-top: 196px; i.e according to our previous coversation.
                                                        (please copy the directory instead so the infos can still be here for you when you need them)
    padding-top: 20px;
    text-align: center;
    z-index: -2;
}





4.-----when you get to the COMMENTS SECTIONS via <div class="comment-box"> 
you will notice that our comment botton fails to take you to the next action which is posting your comments on the board.
to activate add "/>" after <value="comment"
you can then use js or python to give commands to the next action.
(please copy the directory instead so the infos can still be here for you when you need them)





5.-----at the search tab. there is a content that is displayed "none". when you delete the display:none.. the tab appears. its a MODAL TAB:

.search-ads{
    display: none;---------------------------> delete the display:none to view the tab.
                                                (please copy the directory instead so the infos can still be here for you when you need them)
    margin-left: 10px;
}

at the top of the header. we also have a button by the right hand side. when clicked triggers the "add content" room... so i also displayed it "none" so.. please take your time to add javascript on it cos im really backwards on scripting... this is where you find this modal:

.addboard{
    display: none;------------------------> delete the display:none to view the tab.
                                            (please copy the directory instead so the infos can still be here for you when you need them)
    background: white;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    position: absolute;
}


6.------ bro please check out the commenting section. you will find out that the first part of the comment section shows the complete state of how the comment section will look.
when you click on the reply it will dropdown the other part of comment section via js which i still dont know how to do yet.
the comment sections can be found at the article-post.html and product.html

bro, at the comments section. when you add "display:none" to a comment <form>, you will realise that the reply textarea part disappears.
i.e:
<form action="comment" method="POST" id="commentform" style="display: none;"> ----------> the display: none makes the reply textarea disappear, when you delete the display:none you will see the reply textarea. the reply part is inside every comment code, just that i deleted the display:none from only the first one, that is why you can see the reply textarea only on the first one.. when you do the same with others, you will see the reply textarea. so you can just use js to make the reply content appear by clicking on the "Reply" on the comment section.

when you scroll around the comment section you will find that all the <forms> are disabled with a display:none except the first one both on "product.html" and "articles-post.html".

7.----- see bro, for 1 crazy reason i suffered to create a TOOLTIPTEXT that appears when you hover on an icon. that demonic ben onoh just do small juju that regeniusify my geniusity. theres no more tooltiptexts on the header icons. i was thinking it would be a bad idea to delete the tooltiptext entirely but our "Articles" still makes use of it to display usernames, i only shut the tooltiptext down on the icons related to the header. if i no come marry for una village this december make i know wetin cos am... una girls fine chai!!!!

.icon2:hover .tooltiptext{
    visibility: visible;
    display: none;-----------> it has been displayed "none"
}


8.-----hello bro.. i replaced the tooltiptext with a popup menu of msgs, notifications and saved which also appears when the three icons are clicked...
we have "message-popup, message-popup-1, and message-popup-2"......

.message-popup: message popup menu
.message-popup-1: notification popup menu
.message-popup-2: saved popup menu

.message-popup{
    display: none;--------------->delete the display:none to view the tab.
                                                (please copy the directory instead so the infos can still be here for you when you need them)
    position: absolute;
    background: white;
    height: 500px;
    width: 350px;
    margin-top: 10px;
    box-shadow: 0px 4px 14px 0.5px rgba(102, 102, 102, 0.486);
}


.9-------yo bro.. we have racks in ohyanga, another feature that represents the well trusted and harddworking users in the platform. when you get racked your account gets displayed to everyone using ohyanga throughout the 195 countries in the world. and we would also be advertising the rack by ourselves without them paying any dime most especially to companies to know these are the hardworking users we've got in stock.
so the racks could be found in "businesses.html" and "user-profile.html". the racks are identified with a border of #00c2f4 which means "blue"

.b-photo{
    background: #757575;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid white;-------------> this the the normal user display
    position: absolute;
    margin-left: 50px;
    top: 300px;
}
.b-photo-racked{
    background: #757575;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid #00c2f4;------------> this is the racked user display.. so what youve got to do is to 
                                            add js intelligence to it to display immediately their analystics gets filled. i'm we would explain more to you when you get to this stage of programming.
                                            (please copy the directory instead so the infos can still be here for you when you need them)
    position: absolute;
    margin-left: 50px;
    top: 300px;
}

9.------ we also have a modal for "report business"
.reportboard{
    display: none;-------------> delete display: none to view.
                                    (please copy the directory instead so the infos can still be here for you when you need them)
    position: fixed;
    background: rgba(0, 0, 0, 0.637);
    color: black;
    width: 100%;
    height: 100vh;
    padding-top: 15%;
    top: 0;
    left: 0;
    z-index: 80;
}

these are the three popup modals that involves signing up and sign in. they are all displayed: none until you delete the "display:none" you will be able to see them. so the signinalert comes in first before the signin-modal then the last is the signup-modal. i.e when you click on a button, it provides you an alert to let you know you are not logged in and as such woul be limmited to various features in Ohyanga.com. so the best you could do is to click on signin in the signinalert and it directs you to the signin-modal.. if you dont have an account with Ohyanga there are other options to click and get down to the signup-modal.

.signinalert{
    display: none;
}
.signin-modal{
    display: none;
}
.signup-modal{
    display: none;
}



This is the code to see the select tab for the select optional code.
.selection .options{
    visibility: hidden;-----------------> remove the visibility:hidden to see the select tab.
                                            (please copy the directory instead so the infos can still be here for you when you need them)
    position: absolute;
    margin-top: 2px;
    background: #f2f2f2;
    padding: 10px;
    width: 420px;
    display: inline-block;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 2px 20px 0.5px rgba(117, 117, 117, 0.11);
    z-index: 3;
}



.campaign-manager{
    display: none;---------------------------------------> remove the visibility:hidden to see the campaign 
                                                            tab to choose ads for product or services.
                                                            (please copy the directory instead so the infos can still be here for you when you need them)
    position: fixed;
    background: rgba(0, 0, 0, 0.637);
    color: black;
    width: 100%;
    height: 100vh;
    padding-top: 5%;
    top: 0;
    left: 0;
    z-index: 80;
    overflow: auto;
}

.campaign-manager .already--active{
    visibility: hidden;----------------------------> remove the visibility:hidden to see the already active
                                                    tab.
                                                    (please copy the directory instead so the infos can still be here for you when you need them)
    background: white;
    color: #757575;
    border: 1px solid #dbdbdb;
    position: absolute;
    padding: 15px;
    margin-top: -80px;
    margin-left: 160px;
    height: 110px;
    width: 240px;
    text-align: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 1px 14px 0.5px rgba(102, 102, 102, 0.185);
}