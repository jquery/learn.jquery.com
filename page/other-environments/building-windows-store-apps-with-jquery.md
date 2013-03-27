---
title: Building Windows Store applications with jQuery 2.0
level: intermediate
---

With the release of Windows 8, Microsoft introduced Windows Store applications which can be authored with traditional web languages leveraging the power of Internet Explorer 10’s underlying engines. This means jQuery 2.0 can be used to build Windows Store applications in Windows 8.

## Understanding Context

Windows Store applications, unlike the web, have two different contexts known as local, and web. Due to the access that code in the local context has to the Windows Runtime APIs, a new security model was needed. Additionally, some of the APIs that are common to the web were modified to fit their new native environment in a more meaningful way.

