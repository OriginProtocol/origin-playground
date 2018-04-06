
var driver = new Driver();
window.driver = driver;
// Define the steps for introduction
driver.defineSteps([
  {
    element: '.wallet-chooser',
    popover: {
      title: 'Wallet Chooser',
      description: 'The wallet chooser lets you quickly switch between wallets. Use different wallets for Identities, Certifiers and Protected Contracts.',
      position: 'bottom'
    }
  },
  {
    element: '.identities-list',
    popover: {
      title: 'Identities',
      description: 'Identities have Claims and',
      position: 'bottom'
    }
  },
  {
    element: '.certifiers-list',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'top'
    }
  },
  {
    element: '.protected-list',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'right'
    }
  },
]);
