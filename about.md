# About
## Background
### Introduction
The evolution of autonomous and connected vehicles fundamentally reshapes modern transportation systems. Beyond advances in perception and onboard decision-making, the true enabler of large-scale autonomy lies in coordination and integration between entities. Vehicle-to-Vehicle (V2V) and Vehicle-to-Infrastructure (V2I), collectively referred to as V2X communication, form the backbone of this ecosystem, enabling cooperative awareness, coordinated maneuvers, traffic optimization, and enhanced road safety. In such an environment, secure, reliable, and privacy-preserving communication is not optional—it is a foundational requirement.

To address these requirements, the IEEE 1609.2 \cite{ieee16092-2022} and IEEE 1609.2.1 \cite{ieee160921-2022} standards define a comprehensive security architecture for V2X communications. At the core of this architecture lies the Security Credential Management System (SCMS), a public key infrastructure (PKI) responsible for issuing and managing digital certificates used by V2X end entities (EEs). These end entities include onboard units (OBUs), roadside units (RSUs), aftermarket safety devices (ASDs), and other computing platforms that participate in V2X applications. SCMS-issued certificates encode permissions that define the application message types an EE is authorized to transmit, using Provider Service Identifiers (PSIDs) and Service Specific Permissions (SSPs) as defined in IEEE 1609.12.

A defining feature of the SCMS architecture is its strong emphasis on privacy. To prevent long-term tracking of vehicles (mobile OBUs), the SCMS often issues pseudonym certificates, allowing EEs to rotate credentials over time while maintaining authenticated and authorized communication. This approach enables trust without sacrificing anonymity, a critical requirement for public acceptance and regulatory compliance in V2X deployments.

Despite its importance, SCMS remains a complex and challenging system to implement. It is inherently distributed, composed of multiple interacting components, and must address a wide range of concerns beyond cryptography alone. These include performance and scalability, task parallelism, coordination between services, database management, and reliable handling of large volumes of security-critical data. As a result, existing SCMS implementations are proprietary, difficult to audit, and costly to adapt or extend—creating significant barriers to both industrial innovation and academic research.

The openSCMS project addresses this gap by providing an open-source implementation of the core components and workflows of an IEEE 1609.2.1-compliant SCMS. Rather than aiming for exhaustive coverage of every optional feature, openSCMS focuses on implementing the fundamental building blocks required to support all essential EE–SCMS interaction flows. This “minimum complete” approach enables real-world usability while preserving architectural clarity and extensibility.

openSCMS is designed as a scalable distributed system aligned with the architectural principles proposed by the standard. It adopts a microservices-based design in which each SCMS component is isolated and manages its own data, enabling independent scaling and clearer separation of responsibilities. Task parallelism is achieved through a message-driven architecture using task queues (e.g., MQTT), allowing the system to efficiently handle concurrent certificate requests and cryptographic operations. The backend implementation is primarily written in Rust, leveraging its strong guaranties around memory safety, concurrency, and performance—properties that are essential when dealing with security-critical infrastructure at scale.

At the heart of openSCMS lies a key technical contribution: the oscms-codecs-bridge, a low-level library written in C that implements the core cryptographic logic in addition to the encoding and decoding of IEEE 1609.2.1 SPDUs and ASN.1 structures. This library encapsulates the most sensitive and complex aspects of SCMS operation, including decoding client messages, verifying digital signatures, decrypting requests, constructing compliant responses, encrypting payloads, and generating both explicit and implicit pseudonym certificates exactly as specified by the standard. By centralizing this functionality, the bridge acts as the cryptographic and protocol “engine” of openSCMS.

A defining characteristic of the oscms-codecs-bridge is its codec-agnostic design. It abstracts the underlying ASN.1 transpiler behind a clean API, eliminating dependency on proprietary or closed-source toolchains that have historically dominated this space. openSCMS currently relies on an open-source transpiler, but the architecture explicitly allows alternative transpilers to be integrated or extended in the future. This design not only avoids vendor lock-in, but also improves auditability, portability, and long-term sustainability of the SCMS ecosystem. Moreover, the oscms-codecs-bridge can be used independently of the Rust backend, making it a standalone contribution that can be embedded in other SCMS implementations or used in dedicated testing and validation tools.

By providing an open, extensible, and production-oriented SCMS implementation, openSCMS unlocks new possibilities for both industry and universities. Industrial teams can rapidly prototype and evaluate SCMS-based solutions without the burden of building a complete infrastructure from scratch. Academic researchers gain access to a realistic and modifiable SCMS platform for experimentation, including the evaluation of alternative cryptographic strategies (e.g., evaluating the impact of transitioning to post-quantum cryptography), methods for misbehavior detection and reporting (e.g., machine learning approaches \cite{lone2024}), efficient management and maintenance of revocation lists (cite some examples), etc. Equally important, developers implementing V2X client software can use openSCMS as a reference and validation backend, enabling comprehensive testing of client–SCMS interactions without requiring a separate, proprietary SCMS deployment.

In summary, openSCMS lowers the barrier to entry for secure V2X infrastructure development by combining a modern, safe systems backend with a high-performance, codec-agnostic cryptographic core. It represents both a practical tool and a foundational contribution to the open V2X security ecosystem. Overall, openSCMS demonstrates that secure, privacy-preserving V2X infrastructures can be both standards-compliant and openly accessible, enabling innovation across industry and academia.
### Challenges of Secure V2X Infrastructure
Secure V2X communication relies on a carefully designed trust infrastructure capable of supporting large-scale, privacy-preserving, and performance-critical interactions between heterogeneous entities. Within the IEEE 1609.2 and IEEE 1609.2.1 framework, this role is fulfilled by the Security Credential Management System (SCMS). While conceptually defined as a public key infrastructure (PKI), the SCMS extends far beyond traditional PKI systems, introducing unique architectural, cryptographic, and operational challenges driven by the scale and privacy requirements of V2X ecosystems.
### The Role of SCMS in V2X Security
The SCMS is responsible for creating and managing digital certificates that enable authenticated application-level interactions between end entities (EEs), such as onboard units (OBUs) and roadside units (RSUs) and other computing platforms. These certificates encode authorization information using Provider Service Identifiers (PSIDs) and Service Specific Permissions (SSPs), allowing fine-grained control over which applications and activities an end entity (EE) is permitted to perform.

A defining characteristic of the SCMS architecture is its emphasis on privacy preservation at scale. Rather than relying on long-lived identifiers, the SCMS frequently provisions pseudonym certificates, allowing end entities to rotate credentials over time. This approach ensures that messages remain authenticated and authorized while preventing long-term tracking of vehicles or infrastructure nodes—an essential requirement for public trust and regulatory compliance.
### Core SCMS Interaction Flows
The IEEE 1609.2.1 standard defines two primary use cases governing the interaction between end entities and the SCMS. These use cases form the backbone of any compliant SCMS implementation.

\subsubsection{Enrollment Certificate Provisioning}

Before an EE can participate in secure V2X communication, it must first obtain an enrollment certificate. This certificate establishes the EE’s identity within the SCMS ecosystem and is used exclusively for secure communication with SCMS components.

In the enrollment certificate provisioning flow, an enrollment certificate authority (ECA) provisions the EE with an enrollment certificate. The request may be sent either directly by the EE or indirectly via a Device Configuration Manager (DCM) acting on its behalf. Upon receiving a valid request, the ECA verifies the request according to policies defined by the SCMS manager and responds with an enrollment certificate.

This use case represents the foundational trust-establishment step in the SCMS lifecycle and serves as the prerequisite for all subsequent interactions.

\subsubsection{Authorization Certificate Provisioning}

Once an EE possesses a valid enrollment certificate, it may request authorization certificates, which are used in application-level V2X communications. This use case is significantly more complex and involves multiple SCMS components.

In the authorization certificate provisioning flow, the EE interacts primarily with the Registration Authority (RA), either directly or via a Location Obscurer Proxy (LOP) when location privacy is required. The EE submits a request for authorization certificates, which, if valid, results in an acknowledgment from the RA specifying the time and location from which the certificates can be downloaded.

Behind the scenes, the RA coordinates with several other SCMS components to generate the requested certificates. These include the Authorization Certificate Authority (ACA) and, for pseudonym certificates, the Linkage Authorities (LA1 and LA2). Optionally, a Supplementary Authorization Server (SAS) may also be involved. This multi-party interaction ensures that no single component can independently link certificates to a specific EE, reinforcing the privacy guarantees of the system.

The standard supports two approaches to authorization certificate provisioning. In the first, the EE requests and receives a single authorization certificate. In the second, more scalable approach, the EE employs butterfly key expansion, allowing a single request to result in a set of certificates covering multiple time periods and, potentially, multiple certificates per period. This mechanism significantly reduces communication overhead while maintaining strong cryptographic separation between certificates.
### Architectural and Operational Challenges
Implementing an SCMS that correctly supports these interaction flows presents a number of non-trivial challenges.

First, SCMS is inherently a distributed system, composed of multiple logical components that must coordinate securely and efficiently. Each component has distinct responsibilities, data models, and trust assumptions, making isolation and clear interface definitions essential.

Second, the system must handle high volumes of cryptographic operations, including signature verification, encryption, decryption, and certificate generation, often under strict latency constraints. This must be achieved while preserving privacy properties such as unlinkability and resistance to correlation attacks.

Third, SCMS implementations must address traditional systems challenges that are largely orthogonal to cryptography but equally critical to correctness and scalability. These include task parallelism, asynchronous processing, reliable message exchange, database consistency, fault tolerance, and operational observability.

Finally, from a development and research perspective, SCMS implementations have historically suffered from limited accessibility. Proprietary implementations and closed toolchains make it difficult for researchers to experiment with alternative cryptographic strategies—such as  TODO EXAMPLE —or for industry teams to prototype and validate client-side implementations without substantial upfront investment.

## The openSCMS
### Overview
The challenges outlined above—ranging from cryptographic correctness and privacy preservation to scalability, system coordination, and operational complexity—highlight the need for an SCMS implementation that is both architecturally sound and practically usable. The openSCMS project was designed specifically to address these challenges by providing a clean, modular, and validated implementation of the core IEEE 1609.2.1 SCMS workflows.

Rather than attempting to replicate every optional component defined in the standard, openSCMS focuses on delivering a compact yet complete architecture that correctly implements the essential interaction flows between end entities and the SCMS. This approach ensures correctness and interoperability while significantly lowering the barrier to adoption for both industrial and academic users.

A key design goal of openSCMS is to remain faithful to the logical structure and security guarantees of the standard, while simplifying deployment, experimentation, and extension. This balance is achieved through clear component boundaries, explicit interfaces, and a strong separation between protocol logic, cryptographic processing, and system orchestration.

These design choices directly influence the architectural decisions presented in the next section, which describes how openSCMS realizes these concepts through a layered and distributed implementation.
### Compact yet Complete SCMS Architecture
openSCMS implements the two fundamental EE interaction flows defined by IEEE 1609.2.1: enrollment certificate provisioning and authorization certificate provisioning. These flows are supported through direct interaction between the EE and the Enrollment Certificate Authority (ECA) and Registration Authority (RA), respectively.

To reduce architectural overhead while preserving functional correctness, openSCMS does not implement certain auxiliary components defined in the standard, such as the Device Configuration Manager (DCM), the Location Obscurer Proxy (LOP), and the Supplementary Authorization Server (SAS). Instead, the system enables the correct execution of both provisioning flows through a streamlined architecture in which:

\begin{itemize}
    \item End entities interact directly with the ECA for enrollment certificate provisioning.
    \item End entities interact directly with the RA for authorization certificate provisioning.
    \item The RA additionally exposes endpoints responsible for certificate distribution, effectively subsuming the role of the Distribution Center (DC).
    \item Essential bootstrapping functionality for end entities—traditionally associated with the DCM—is provided directly by openSCMS.
\end{itemize}

This design preserves the security and privacy properties mandated by the standard while avoiding unnecessary complexity. As a result, openSCMS provides a practical foundation that can be deployed, tested, and extended without requiring a full-scale SCMS deployment.

Importantly, the correctness of these flows has not been validated solely through specification compliance, but also through end-to-end integration with a conformant EE client. The client implements the IEEE 1609.2.1 protocol exactly as specified and successfully completes enrollment and authorization provisioning flows against openSCMS, demonstrating protocol-level interoperability and validating the architectural choices made by the project.
### Establishing the Root of Trust
Before an EE can securely interact with the SCMS, it must establish a root of trust by being provisioned with certificates for electors, root certificate authorities (root CAs), or both. The IEEE 1609.2.1 standard explicitly leaves the mechanisms and security requirements for this provisioning outside its scope.

openSCMS addresses this gap by providing a flexible and extensible mechanism for initializing trust anchors. During system startup, openSCMS loads Certificate Chain Files (CCFs) and Certificate Trust Lists (CTLs), which define the trust relationships used throughout the system.

To support testing, experimentation, and rapid deployment, openSCMS includes a standalone utility, scms-manager, implemented on top of the oscms-codecs-bridge library. This tool enables the generation of elector and root CA key pairs and certificates, as well as the creation of CCF and CTL artifacts. These generated payloads can be directly consumed by openSCMS during initialization.

While scms-manager serves as a reference and support tool, openSCMS does not impose a fixed trust model. Users remain free to generate and manage trust anchors according to their own operational and security requirements, ensuring that the system can be adapted to a wide range of deployment scenarios.
### Deployment and Operational Considerations
In addition to protocol correctness and cryptographic soundness, openSCMS was designed with operational practicality in mind. Secure infrastructure must be deployable, observable, and maintainable in real-world environments.

To this end, openSCMS provides a unified deployment strategy based on Docker, Kubernetes, and Skaffold. This setup enables reproducible builds, simplified deployment and redeployment workflows, and seamless integration with modern container orchestration and monitoring ecosystems.

By adopting cloud-native deployment practices, openSCMS supports scalable experimentation, automated testing, and continuous integration workflows. This operational flexibility further reinforces the project’s goal of serving as a practical foundation for both research and industrial prototyping.

## Governance and Licensing
### Governance Model
TODO
### Developer Grant and CLA
TODO
### Apache License, Version 2.0
Copyright
Unless otherwise specified, all content, including all source code files and documentation files in this repository are:

Copyright (c) 2025 LG Electronics, Inc.

License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at:

http://www.apache.org/licenses/LICENSE-2.0

Terms and Conditions
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.

SPDX License Identifier
SPDX-License-Identifier: Apache-2.0

Full License Text
For the complete text of the Apache License 2.0, please visit:
### FAQ
TODO

## Release Notes
## OpenSCMS 1.0.0
TODO