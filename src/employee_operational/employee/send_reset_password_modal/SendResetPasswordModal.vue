<script lang="ts">
import CreateSimpleId from 'src/functions/CreateSimpleId';

interface DataObject {
  id: string
}

let myModal: any = null;

export default {
  props: ["onlistener"],
  data(): DataObject {
    return {
      id: CreateSimpleId(10),
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() { },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'RESET_PASSWORD':
          e.preventDefault();
          this.$props.onlistener({}, e);
          break;
        case 'CANCEL_RESET_PASSWORD':
          e.preventDefault();
          this.hide();
          break;
      }
    },
    async show(props: any) {
      let _id_element = this.id
      var _trrr = document.getElementById(_id_element);
      myModal = new window.bootstrap.Modal(_trrr, {
        backdrop: 'static',
        keyboard: false
      });
      if (_trrr == null) return;
      _trrr.addEventListener("hidden.bs.modal", (event: any) => {
        // do something...
        if (event.target.id == _id_element) { }
      });
      myModal.show();
    },
    async hide() {
      myModal.hide();
    },
  }
}
</script>
<template>
  <div class="modal modal-blur fade" :id="id" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-status bg-primary"></div>
        <div class="modal-body text-center py-4">
          <!-- Download SVG icon from http://tabler-icons.io/i/circle-check -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-yellow icon-lg icon-tabler-road-sign" width="40"
            height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z">
            </path>
            <path d="M9 14v-2c0 -.59 .414 -1 1 -1h5"></path>
            <path d="M13 9l2 2l-2 2"></path>
          </svg>
          <h3>Attention Please!</h3>
          <div class="text-muted">Do you want reset this account password?
          </div>
          <br>
          <div class="text-muted"><b>"Make sure this user have valid email address."</b></div>
        </div>
        <div class="modal-footer">
          <div class="w-100">
            <div class="row">
              <div class="col">
                <a v-on:click="handleClick('RESET_PASSWORD',{},$event)" class="btn btn-primary w-100"
                  data-bs-dismiss="modal">
                  Yes Reset it.
                </a>
              </div>
            </div>
            <div class="hr-text">or</div>
            <div class="row">
              <div class="col">
                <a v-on:click="handleClick('CANCEL_RESET_PASSWORD',{},$event)" class="btn w-100"
                  data-bs-dismiss="modal">
                  Cancel it.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>