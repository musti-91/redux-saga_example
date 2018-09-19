// read the topic "TestCafe" in the readme file

import { Selector } from 'testcafe'; // first import testcafe selectors

const login = async (t, isNewLoginPage) => {
  const creds = {
    name: "btp-investigator-1@ucbbtpm.onmicrosoft.com",
    pw: "pwd-INV-1-1"
  }

  if (isNewLoginPage) {
    console.log("logging in to new page", isNewLoginPage)
    await t.wait(5000)
      .typeText(Selector('#i0116'), creds.name)
      .click(Selector('#idSIButton9'))
      .typeText(Selector('#i0118'), creds.pw)
      .click(Selector('#idSIButton9'))

  } else {
    console.log("logging in")
    await t.wait(5000)
      .click(Selector('#use_another_account_link'))
      .typeText(Selector('#cred_userid_inputtext'), creds.name)
      .typeText(Selector('#cred_password_inputtext'), creds.pw)
      .click(Selector('#cred_sign_in_button'))
  }
}


const loginAndNavigate = async (t, url, isNewLoginPage) => {
  await login(t, isNewLoginPage);
  await t.navigateTo(url);
  await t.wait(3000)
}

const loginAndNavigateIfNeeded = async (t, url) => {
  const isLoginPage = await Selector("#use_another_account_link").exists;
  const isNewLoginPage = await Selector("#optOutUserBanner").exists;

  console.log("is login page: ", isLoginPage || isNewLoginPage);
  console.log("and is new: ", isNewLoginPage);
  if (isLoginPage || isNewLoginPage) {
    await loginAndNavigate(t, url, isNewLoginPage)
  } else {
    await t.navigateTo(url)
    await t.wait(3000)
  }
}

const baseUrl = "http://localhost:3000"
const targetUrl = `${baseUrl}`

fixture(`Getting Started`) // declare the fixture
  .page(targetUrl)
  .beforeEach(async t => await loginAndNavigateIfNeeded(t, targetUrl))


//then create a test and place your code there
test("Portal test", async t => {
  const hasLoadedPortal = await Selector(".navbar-header__title").exists;
  console.log("hasLoadedPortal: ", hasLoadedPortal);
    await t.debug()
  if(hasLoadedPortal){
    console.log("successfully loaded the portal");
  }
})