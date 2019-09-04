<template>
    <div class="container">
    <div class="row">
    <div id="inboxstyle">
    <div class="fab btn-group show-on-hover dropup">
    <div data-toggle="tooltip" data-placement="left" title="Compose" style="margin-left: 50px;">
    <button type="button" class="btn btn-info btn-io" >
      <span class="fa fa-pencil ">
          <!-- <i class="fa fa-plus fa-stack-1x fa-inverse fab-primary"></i>
          <i class="fa fa-pencil fa-stack-1x fa-inverse fab-secondary"></i> -->
      </span>
    </button>
  </div>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 1">
        <i class="fa fa-twitter"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 2">
        <i class="fa fa-google"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 3">
        <i class="fa fa-user"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 4">
        <i class="fa fa-instagram"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 5">
        <i class="fa fa-pencil"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link6">
        <i class="fa fa-spinner fa-spin"></i></a>
        </li>
        <li>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Link 4">
        <i class="fa fa-map-marker"></i></a>
            <!-- <a href="#" data-toggle="tooltip" data-placement="top" title="Link 7">
        <i class="fa fa-cog fa-fw"></i></a> -->
        </li>
        </ul>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
     name: 'Boton',
  components: {
      
  }
}
</script>

<style scoped>
.fab {
cursor: pointer;
}
.fab-backdrop {
color: rgba(255, 255, 255, 0);
}
.fab-primary, .fab-secondary {
transition: all 0.35s ease-in-out;
}
.fab.active .fab-primary {
opacity: 0;
transform: rotate(225deg);
}
.fab-secondary {
opacity: 0;
transform: rotate(-225deg);
}
.fab.active .fab-secondary {
opacity: 1;
transform: rotate(0);
margin-top: -2px;
}
#inboxstyle .show-on-hover:hover > ul.dropdown-menu {
display: block;    
}
#inboxstyle .show-on-hover {
position: absolute;
bottom: 20px;
right: 20px;
}
#inboxstyle .btn-io{
border-radius: 50%;
height: 54px;
width: 60px;
padding: 0 !important;
box-shadow: 0px 3px 7px 0px rgba(202, 124, 124, 0.72);
}
#inboxstyle .dropup .dropdown-menu, .navbar-fixed-bottom .dropdown .dropdown-menu {
top: auto;
bottom: 100%;
margin-bottom: 1px;
margin-bottom: -5px;
padding-bottom: 30px;
}
#inboxstyle .dropdown-menu-right {
right: 0 !important;
left: auto !important;
}
#inboxstyle .dropdown-menu {
position: absolute;
top: 100%;
left: 0;
z-index: 1000;
display: none;
float: left;
min-width: 50px;
padding: 5px 0;
margin: 2px 0 0;
font-size: 14px;
text-align: center;
list-style: none;
background-color: rgba(255, 255, 255, 0) !important;
-webkit-background-clip: padding-box;
background-clip: padding-box;
border: none;
border-radius: 0px;
-webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0) !important;
box-shadow: 0 6px 12px rgba(0, 0, 0, 0) !important;
}
#inboxstyle .fa-iox{
font-size: 21px;
}
#inboxstyle .dropdown-menu > li > a {
display: block;
padding: 0;
padding-top: 4px;
margin-top: 20px;
clear: both;
font-weight: normal;
line-height: 1.42857143;
color: #fff;
background: #405282;
white-space: nowrap;
width: 40px;
height: 40px;
border: solid 1px #ccc;
border-radius: 50px;
font-size: 21px;
box-shadow: 0px 3px 7px 0px rgba(203, 203, 203, 0.72);
}
</style>