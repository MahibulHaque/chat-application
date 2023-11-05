"use client";
import Router from "next/router";
import NProgress from "nprogress";

let timer: NodeJS.Timeout | null = null;
let activeRequests = 0;
const delay = 250;

function load() {
  if (timer === null) {
    timer = setTimeout(() => {
      NProgress.start();
    }, delay); // only show the progress bar if it takes longer than the delay
  }
}

function stop() {
  activeRequests -= 1;
  if (activeRequests === 0) {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    NProgress.done();
  }
}

Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

const originalFetch = window.fetch;
window.fetch = async (...args: Parameters<typeof originalFetch>) => {
  if (activeRequests === 0) {
    load();
  }

  activeRequests++;

  try {
    const response = await originalFetch(...args);
    return response;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    stop();
  }
};

export default function Progressbar() {
  return null;
}
