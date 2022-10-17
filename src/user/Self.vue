<script lang="ts">
  export default {
    
  }
</script>
<template>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <!-- Page pre-title -->
          <div class="page-pretitle">
            User Account
          </div>
          <h2 class="page-title">
            User Information
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-12 col-md-auto ms-auto d-print-none">
          <div class="btn-list">
            <!--  <span class="d-none d-sm-inline">
              <a href="#" class="btn btn-white">
                New view
              </a>
            </span> -->
            <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
              data-bs-target="#modal-report">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                <circle cx="12" cy="14" r="2"></circle>
                <polyline points="14 4 14 8 8 8 8 4"></polyline>
              </svg>
              Save
            </a>
            <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report"
              aria-label="Create new report">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body" style="height:100%;">

    <div class="container card bg-white mt-3 mb-3" style="width:77.5%;">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-3">
            <img class="rounded-circle mt-5" width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
            <span class="font-weight-bold">Edogaru</span>
            <span class="text-black-50">edogaru@mail.com.my</span>
            <span></span>
          </div>
        </div>
        <div class="col border-right">
          <div class="p-3 py-3">
            <!-- <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="text-right">Profile Settings</h3>
            </div> -->
            <div class="row mt-3">
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="first name" value="">
              </div>
              <div class="col-md-6">
                <label class="form-label">Surname</label>
                <input type="text" class="form-control" value="" placeholder="surname">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 mt-3">
                <label class="form-label">Mobile Number</label>
                <input type="text" class="form-control" placeholder="enter phone number" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">Address Line 1</label>
                <input type="text" class="form-control" placeholder="enter address line 1" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">Address Line 2</label>
                <input type="text" class="form-control" placeholder="enter address line 2" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">Postcode</label>
                <input type="text" class="form-control" placeholder="enter address line 2" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">State</label>
                <input type="text" class="form-control" placeholder="enter address line 2" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">Area</label>
                <input type="text" class="form-control" placeholder="enter address line 2" value="">
              </div>
              <div class="col-md-12 mt-3">
                <label class="form-label">Email ID</label>
                <input type="text" class="form-control" placeholder="enter email id" value="">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <label class="form-label">Country</label>
                <input type="text" class="form-control" placeholder="country" value="">
              </div>
              <div class="col-md-6">
                <label class="form-label">State/Region</label>
                <input type="text" class="form-control" value="" placeholder="state">
              </div>
            </div>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>