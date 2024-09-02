<section class="section-login wf-section">
  <div class="container-login">
    <h1 id="header-login" class="centered-heading">Unlock To View Exclusive Content</h1>
    <p id="subheader-paywall" class="centered-subheading"><a target="_blank" href="<?php echo get_field("more_info"); ?>">ℹ️</a> <?php echo get_field("requirements"); ?></p>
    <div id="lockpay" class="container-2 w-container">
        <div class="columns w-row">
          <div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
            <div id="paylink">
            <a id="unlocklink" button="email" href="#" class="email-login w-button" >🚪🚶 Unlock</a>
            </div>
          </div>
          <div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
            <a id="unlocklink" button="nft" target="_blank" href="<?php echo get_field("checkout_link"); ?>" class="loginwithnft w-button" >🔑 Acquire</a>
          </div>
          <div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
            <a id="unlocklink" button="crypto" target="_blank" href="https://zapper.xyz/" class="cryptologin w-button" >🏠🏃🏽‍♀️ Check Wallet</a>
          </div>
          <div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
            <a id="unlocklink" button="pass" target="_blank" href="https://sequence.app/auth" class="b4 w-button">🤷🏽 First Timer?</a>
          </div>
        </div>
      </div>
  </div>
</section>

<style>
  #lit-connect-modal-container * {
    font-size: 12px;
  }
  #parent-container {
    display: flex;
    justify-content: center;
}

#alert-div {
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 2px 0px 20px 0px black;
    font-family: system-ui;
    text-transform: uppercase;
    top: 10px;
    width: 60%;
    text-align: center;
    font-weight: 700;
    position: fixed;
    margin-left: 20%;
}

</style>