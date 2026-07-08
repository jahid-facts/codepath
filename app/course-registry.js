import { l, modules as sdModules, topics as sdTopics, labs as sdLabs } from './data.js'
import { dsaModules, dsaTopics, dsaLabs } from './courses/dsa.js'
import { gitModules, gitTopics, gitLabs } from './courses/git.js'
import { netModules, netTopics, netLabs } from './courses/networking.js'
import { linuxModules, linuxTopics, linuxLabs } from './courses/linux.js'
import { dockerModules, dockerTopics, dockerLabs } from './courses/docker.js'
import { k8sModules, k8sTopics, k8sLabs } from './courses/kubernetes.js'
import { networkingModule, networkingTopics } from './courses/system-design-networking.js'

// Tag content with its owning course without mutating the source arrays
// (data.js exports are asserted directly by the test suite).
const tag = (courseId, items) => items.map((item) => ({ ...item, courseId }))

// System Design = the fixed core (data.js) with the Networking basics module inserted
// at position 2 (right after Foundations). Module numbers and topic order are renumbered
// across the combined list so the sequence and pagination stay correct.
const sdModuleOrder = [sdModules[0], networkingModule, ...sdModules.slice(1)]
const sdAllModules = sdModuleOrder.map((m, i) => ({ ...m, courseId: 'system-design', number: String(i + 1).padStart(2, '0') }))
const sdCombinedTopics = [...sdTopics, ...networkingTopics]
const sdAllTopics = sdAllModules
  .flatMap((m) => sdCombinedTopics.filter((topic) => topic.moduleId === m.id))
  .map((topic, i) => ({ ...topic, courseId: 'system-design', order: i + 1 }))

// Full courses (with authored content) and upcoming placeholders share one shape
// so the catalog and switcher can render them uniformly.
export const courses = [
  {
    id: 'system-design', available: true,
    title: l('System Design', 'সিস্টেম ডিজাইন'),
    tagline: l('System design', 'সিস্টেম ডিজাইন'),
    summary: l('Design scalable, reliable architectures from first principles to interview-ready case studies.', 'প্রথম নীতি থেকে ইন্টারভিউ-উপযোগী কেস স্টাডি পর্যন্ত স্কেলযোগ্য, নির্ভরযোগ্য আর্কিটেকচার ডিজাইন করুন।'),
    mark: 'S', color: '#6757df', accent: '#f0edff', icon: '◇',
    modules: sdAllModules,
    topics: sdAllTopics,
    labs: sdLabs,
  },
  {
    id: 'dsa', available: true,
    title: l('Data Structures & Algorithms', 'ডেটা স্ট্রাকচার ও অ্যালগরিদম'),
    tagline: l('DSA', 'ডিএসএ'),
    summary: l('Master the core structures and algorithms with visual intuition, complexity, and coding-interview patterns.', 'ভিজ্যুয়াল অন্তর্দৃষ্টি, জটিলতা ও কোডিং-ইন্টারভিউ প্যাটার্নসহ মূল স্ট্রাকচার ও অ্যালগরিদম আয়ত্ত করুন।'),
    mark: 'A', color: '#0f9f78', accent: '#e4f7f0', icon: '▦',
    modules: tag('dsa', dsaModules),
    topics: tag('dsa', dsaTopics),
    labs: dsaLabs,
  },
  {
    id: 'git', available: true,
    title: l('Git & GitHub', 'গিট ও গিটহাব'),
    tagline: l('Git & GitHub', 'গিট ও গিটহাব'),
    summary: l('Version control, branching workflows, pull requests, and collaboration on GitHub.', 'ভার্সন কন্ট্রোল, ব্রাঞ্চিং ওয়ার্কফ্লো, পুল রিকোয়েস্ট ও গিটহাবে সহযোগিতা।'),
    mark: 'G', color: '#e34b87', accent: '#fdeaf1', icon: '⑂',
    modules: tag('git', gitModules),
    topics: tag('git', gitTopics),
    labs: gitLabs,
  },
  {
    id: 'networking', available: true,
    title: l('Computer Networking', 'কম্পিউটার নেটওয়ার্কিং'),
    tagline: l('Networking', 'নেটওয়ার্কিং'),
    summary: l('From IP, TCP, and DNS to HTTP, TLS, and how the internet actually moves packets.', 'IP, TCP ও DNS থেকে HTTP, TLS এবং ইন্টারনেট আসলে কীভাবে প্যাকেট সরায়।'),
    mark: 'N', color: '#188cbd', accent: '#e7f5fb', icon: '⇄',
    modules: tag('networking', netModules),
    topics: tag('networking', netTopics),
    labs: netLabs,
  },
  {
    id: 'linux', available: true,
    title: l('Linux Fundamentals', 'লিনাক্স ফান্ডামেন্টালস'),
    tagline: l('Linux', 'লিনাক্স'),
    summary: l('The shell, filesystem, permissions, processes, and everyday command-line workflows.', 'শেল, ফাইলসিস্টেম, পারমিশন, প্রসেস ও প্রতিদিনের কমান্ড-লাইন ওয়ার্কফ্লো।'),
    mark: 'L', color: '#d97706', accent: '#fff3e0', icon: '❯',
    modules: tag('linux', linuxModules),
    topics: tag('linux', linuxTopics),
    labs: linuxLabs,
  },
  {
    id: 'docker', available: true,
    title: l('Docker', 'ডকার'),
    tagline: l('Docker', 'ডকার'),
    summary: l('Containers, images, volumes, and networking to package and ship applications.', 'অ্যাপ্লিকেশন প্যাকেজ ও শিপ করতে কন্টেইনার, ইমেজ, ভলিউম ও নেটওয়ার্কিং।'),
    mark: 'D', color: '#0284c7', accent: '#e3f2fd', icon: '▧',
    modules: tag('docker', dockerModules),
    topics: tag('docker', dockerTopics),
    labs: dockerLabs,
  },
  {
    id: 'kubernetes', available: true,
    title: l('Kubernetes', 'কুবারনেটিস'),
    tagline: l('Kubernetes', 'কুবারনেটিস'),
    summary: l('Orchestrate containers with pods, deployments, services, and scaling.', 'পড, ডিপ্লয়মেন্ট, সার্ভিস ও স্কেলিং দিয়ে কন্টেইনার অর্কেস্ট্রেট করুন।'),
    mark: 'K', color: '#7c3aed', accent: '#f0edff', icon: '⎈',
    modules: tag('kubernetes', k8sModules),
    topics: tag('kubernetes', k8sTopics),
    labs: k8sLabs,
  },
]

export const DEFAULT_COURSE_ID = 'system-design'

export const availableCourses = courses.filter((course) => course.available)

// Flattened, cross-course views used by routes and progress validation.
export const allTopics = availableCourses.flatMap((course) => course.topics)
export const allModules = availableCourses.flatMap((course) => course.modules)
export const allLabs = availableCourses.flatMap((course) => course.labs)

export const getCourse = (id) => courses.find((course) => course.id === id) || null
export const courseForTopic = (topicId) => availableCourses.find((course) => course.topics.some((topic) => topic.id === topicId)) || null
export const courseForLab = (labId) => availableCourses.find((course) => course.labs.some((lab) => lab.id === labId)) || null
