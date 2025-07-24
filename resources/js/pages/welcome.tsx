"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  List,
  Users,
  Zap,
  Code,
  Database,
  Palette,
  Github,
  Play,
  Star,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react"


// ----------  Animated background that is hook-safe ----------
const InteractiveBackground = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  /* hooks MUST run unconditionally */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { damping: 50, stiffness: 100 }
  const x = useSpring(mouseX, springCfg)
  const y = useSpring(mouseY, springCfg)
  const xSmall = useTransform(x, (v) => v * 0.02)
  const ySmall = useTransform(y, (v) => v * 0.02)
  const xTiny = useTransform(x, (v) => v * 0.015 * -1)
  const yTiny = useTransform(y, (v) => v * 0.015 * -1)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)

    const onMove = (e: MouseEvent) => {
      if (!isMobile && !shouldReduceMotion) {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
    }
    window.addEventListener("mousemove", onMove)

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [isMobile, shouldReduceMotion, mouseX, mouseY])

  const cursorFollowerX = useTransform(x, (v) => v - 8)
  const cursorFollowerY = useTransform(y, (v) => v - 8)

  /*  ---------- single, unconditional return ----------  */
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* static radial mesh - always rendered */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59,130,246,.10) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139,92,246,.10) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(6,182,212,.10) 0%, transparent 50%)`,
        }}
      />

      {/* desktop / motion-allowed extras */}
      {!isMobile && !shouldReduceMotion && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{
              background: "linear-gradient(45deg,#3b82f6,#8b5cf6)",
              x: xSmall,
              y: ySmall,
              left: "10%",
              top: "20%",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute w-64 h-64 rounded-full opacity-8 blur-2xl"
            style={{
              background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
              x: xTiny,
              y: yTiny,
              right: "15%",
              top: "40%",
            }}
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* few gentle dots */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{ left: `${20 + i * 20}%`, top: `${30 + i * 10}%` }}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* cursor follower */}
          <motion.div
            className="absolute w-4 h-4 rounded-full border border-blue-400/30 opacity-40"
            style={{ x: cursorFollowerX, y: cursorFollowerY }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  )
}

// Mobile-optimized Floating Animation Component
const FloatingElement = ({
  children,
  delay = 0,
  duration = 12,
}: { children: React.ReactNode; delay?: number; duration?: number }) => {
  const reduce = useReducedMotion()

  /* even when reduced-motion is ON we still return the same component
     – we just omit the animate prop to keep hook order identical */
  const props = !reduce
    ? {
        animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
        transition: { duration, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const },
      }
    : {}

  return <motion.div {...props}>{children}</motion.div>
}

// Mobile-optimized Stagger Animation Container
const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.3,
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Mobile-optimized Item Animation
const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const shouldReduceMotion = useReducedMotion()

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export default function TaskvelLanding() {
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const features = [
    {
      icon: <List className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Listas Inteligentes",
      description:
        "Organize suas tarefas em listas personalizáveis com relacionamentos claros entre usuários e projetos.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Gestão Completa",
      description: "Criação, edição, exclusão e marcação de conclusão de tarefas com interface moderna e intuitiva.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Calendar className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Prazos e Datas",
      description: "Defina datas de vencimento e acompanhe o progresso das suas tarefas de forma visual.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Multi-usuário",
      description: "Sistema robusto de relacionamentos entre usuários, listas e tarefas para trabalho colaborativo.",
      color: "from-orange-500 to-red-500",
    },
  ]

  const technologies = [
    { name: "PHP", version: "8.2+", color: "bg-purple-500", icon: "🐘" },
    { name: "Laravel", version: "12.x", color: "bg-red-500", icon: "🔥" },
    { name: "React", version: "19.x", color: "bg-blue-500", icon: "⚛️" },
    { name: "TypeScript", version: "5.x", color: "bg-blue-600", icon: "📘" },
    { name: "Vite", version: "5.x", color: "bg-yellow-500", icon: "⚡" },
    { name: "MySQL", version: "Latest", color: "bg-orange-500", icon: "🗄️" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <InteractiveBackground />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5"
        />

        <div className="relative container mx-auto py-12 md:py-20 lg:py-32 z-10">
          <StaggerContainer className="text-center max-w-5xl mx-auto">
            <StaggerItem>
              <FloatingElement delay={0} duration={8}>
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="mb-8 md:mb-12"
                >
                  <img
                    src="/taskvel-banner-new.png"
                    alt="Taskvel Logo"
                    className="mx-auto drop-shadow-2xl max-w-full h-auto"
                    width={isMobile ? 280 : 400}
                    height={isMobile ? 84 : 120}
                    style={{ maxWidth: isMobile ? "280px" : "400px" }}
                  />
                </motion.div>
              </FloatingElement>
            </StaggerItem>

            <StaggerItem>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight px-2"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Gerenciamento de Tarefas
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                  animate={
                    !shouldReduceMotion
                      ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Moderno e Eficiente
                </motion.span>
              </motion.h1>
            </StaggerItem>

            <StaggerItem>
              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Uma aplicação web completa para gerenciamento de tarefas, desenvolvida com{" "}
                <motion.span
                  className="font-semibold text-red-600"
                  whileHover={!isMobile ? { scale: 1.1 } : {}}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  Laravel
                </motion.span>{" "}
                e{" "}
                <motion.span
                  className="font-semibold text-blue-600"
                  whileHover={!isMobile ? { scale: 1.1 } : {}}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  React
                </motion.span>
                . Integração moderna entre backend robusto e frontend reativo.
              </motion.p>
            </StaggerItem>

            <StaggerItem>
              <motion.div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 px-4">
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    size={isMobile ? "default" : "lg"}
                    onClick={() => (window.location.href = "/login")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-10 py-3 md:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 text-base md:text-lg font-semibold group w-full sm:w-auto min-h-[48px]"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
                    Ver Demo
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    onClick={() => window.open("https://github.com/kaikiyuuji/taskvel", "_blank")}
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    className="px-6 md:px-10 py-3 md:py-4 rounded-full border-2 hover:bg-gray-50 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base md:text-lg font-semibold group shadow-lg hover:shadow-xl w-full sm:w-auto min-h-[48px]"
                  >
                    <Github className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
                    Código Fonte
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 px-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}
                    whileHover={
                      !isMobile
                        ? {
                            scale: 1.1,
                            y: -5,
                            transition: { type: "spring", stiffness: 400, damping: 10 },
                          }
                        : {}
                    }
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                    >
                      <span className="mr-1 md:mr-2 text-sm md:text-lg">{tech.icon}</span>
                      {tech.name} {tech.version}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Mobile-optimized Floating Elements */}
        {!isMobile && (
          <>
            <FloatingElement delay={0} duration={12}>
              <motion.div
                className="absolute top-20 left-4 md:left-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
                whileHover={{ scale: 1.2, opacity: 0.4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </FloatingElement>

            <FloatingElement delay={4} duration={16}>
              <motion.div
                className="absolute top-40 right-4 md:right-20 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl"
                whileHover={{ scale: 1.15, opacity: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </FloatingElement>

            <FloatingElement delay={8} duration={20}>
              <motion.div
                className="absolute bottom-20 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full blur-lg"
                whileHover={{ scale: 1.3, opacity: 0.4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </FloatingElement>
          </>
        )}
      </section>

      {/* Enhanced Features Section - Mobile Optimized */}
      <section className="py-16 md:py-24 lg:py-32 bg-white/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-12 md:mb-20">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Funcionalidades Principais
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Tudo que você precisa para organizar suas tarefas e projetos de forma eficiente
                </motion.p>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={
                      !isMobile
                        ? {
                            y: -10,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 10 },
                          }
                        : {}
                    }
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm group overflow-hidden relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      <CardHeader className="text-center pb-3 md:pb-4 relative z-10 p-4 md:p-6">
                        <motion.div
                          className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          whileHover={
                            !isMobile
                              ? {
                                  rotate: 360,
                                  scale: 1.1,
                                  transition: { duration: 0.6, ease: "easeInOut" },
                                }
                              : {}
                          }
                        >
                          {feature.icon}
                        </motion.div>
                        <CardTitle className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 p-4 md:p-6 pt-0">
                        <CardDescription className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors text-sm md:text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Tech Stack Section - Mobile Optimized */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-12 md:mb-20">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Stack Tecnológico Moderno
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Construído com as melhores tecnologias para performance e escalabilidade
                </motion.p>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  title: "Backend",
                  icon: <Database className="w-8 h-8 md:w-10 md:h-10" />,
                  color: "from-red-500 to-orange-500",
                  techs: [
                    { name: "PHP", version: "8.2+", icon: "🐘" },
                    { name: "Laravel", version: "12.x", icon: "🔥" },
                    { name: "MySQL", version: "Latest", icon: "🗄️" },
                  ],
                },
                {
                  title: "Frontend",
                  icon: <Code className="w-8 h-8 md:w-10 md:h-10" />,
                  color: "from-blue-500 to-cyan-500",
                  techs: [
                    { name: "React", version: "19.x", icon: "⚛️" },
                    { name: "TypeScript", version: "5.x", icon: "📘" },
                    { name: "Vite", version: "5.x", icon: "⚡" },
                  ],
                },
                {
                  title: "Design",
                  icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />,
                  color: "from-purple-500 to-pink-500",
                  techs: [
                    { name: "TailwindCSS", version: "Latest", icon: "🎨" },
                    { name: "shadcn/ui", version: "Latest", icon: "🎭" },
                    { name: "Radix UI", version: "Latest", icon: "✨" },
                  ],
                },
              ].map((section, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={
                      !isMobile
                        ? {
                            y: -10,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 10 },
                          }
                        : {}
                    }
                  >
                    <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm group overflow-hidden relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      <CardHeader className="relative z-10 p-4 md:p-6">
                        <motion.div
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${section.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          whileHover={
                            !isMobile
                              ? {
                                  rotate: 360,
                                  scale: 1.1,
                                  transition: { duration: 0.6, ease: "easeInOut" },
                                }
                              : {}
                          }
                        >
                          {section.icon}
                        </motion.div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 p-4 md:p-6 pt-0">
                        <div className="space-y-3 md:space-y-4">
                          {section.techs.map((tech, techIndex) => (
                            <motion.div
                              key={techIndex}
                              className="flex items-center justify-between p-2 md:p-3 bg-gray-50/50 rounded-lg group-hover:bg-white/50 transition-all duration-300"
                              whileHover={!isMobile ? { x: 5 } : {}}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              <div className="flex items-center">
                                <span className="text-lg md:text-xl mr-2 md:mr-3">{tech.icon}</span>
                                <span className="font-medium text-sm md:text-base">{tech.name}</span>
                              </div>
                              <Badge className="bg-white/80 text-gray-700 hover:bg-white transition-colors text-xs md:text-sm">
                                {tech.version}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced CTA Section - Mobile Optimized */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={
            !shouldReduceMotion
              ? {
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <StaggerContainer>
            <StaggerItem>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 px-2"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Pronto para Começar?
              </motion.h2>
            </StaggerItem>

            <StaggerItem>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Clone o repositório e comece a usar o Taskvel em seu ambiente local. Documentação completa e exemplos
                incluídos.
              </motion.p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    size={isMobile ? "default" : "lg"}
                    onClick={() => window.open("https://github.com/kaikiyuuji/taskvel", "_blank")}
                    variant="secondary"
                    className="px-6 md:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-base md:text-lg group shadow-xl hover:shadow-2xl w-full sm:w-auto min-h-[48px]"
                  >
                    <Github className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
                    Clonar Repositório
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    size={isMobile ? "default" : "lg"}
                    onClick={() => window.open("https://github.com/kaikiyuuji/Taskvel/blob/main/README.md", "_blank")}
                    variant="outline"
                    className="px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 bg-transparent text-base md:text-lg group shadow-xl hover:shadow-2xl w-full sm:w-auto min-h-[48px]"
                  >
                    <Star className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
                    Documentação
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Footer - Mobile Optimized */}
      <footer className="py-12 md:py-16 bg-gray-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={
            !shouldReduceMotion
              ? {
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }
              : {}
          }
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-30 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/svg%3E')",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mr-3 md:mr-4 flex items-center justify-center"
                whileHover={!isMobile ? { rotate: 360 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
              <span className="text-xl md:text-2xl font-bold">Taskvel</span>
            </motion.div>

            <motion.div
              className="text-gray-400 text-center md:text-right"
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <p className="text-base md:text-lg mb-1 md:mb-2">Desenvolvido como estudo prático</p>
              <p className="text-xs md:text-sm opacity-75">PHP 8.2+ • Laravel 12.x • React 19.x • TypeScript 5.x</p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
