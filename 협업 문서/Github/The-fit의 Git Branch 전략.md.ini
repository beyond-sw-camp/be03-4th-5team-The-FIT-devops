# :pencil2:The-fit의 Git Branch 전략 

## :sparkles:Git Branch 전략 사용 이유와 종류

## Git Branch 전략이란?
* Project의 Git Branch를 효과적으로 관리하기 위한 워크 플로우 <br>

## Git Branch 전략 사용 이유
* Main Branch에서 많은 개발자들이 협업을 진행하게 된다면, 내가 작업중인 파일을 누군가 접근하여 수정할 수 있기 때문에 매번 누가 어떠한 작업을 진행중인지 확인해야하는 불편함이 발생한다.<br>
또한, 동시에 여러 기능을 개발하게 되면 commit history가 Branching에 섞이게 되므로 Main Branch의 소스코드를 관리하고 rollback하는데에 어려움이 있다.<br>
이렇게 Main Branch에서 동시에 많은 개발자들이 동시에 개발을 진행해 Main Branch의 소스코드가 불안전한 상태로 존재하는 것을 막기 위해 Branch 전략을 사용합니다.<br>

## Git Branch 전략 종류
>1. Git Flow 전략 <br>
* Git Flow 전략이란? <br>
	*Vincent Driessen이 2010년에 올린 A successful Git branching model 이라는 글이 인기를 끌며 대중적으로 사용되게된 Branch 전략이다. 다양한 버전을 제공하는 서비스에 적절한 Git Branch 전략입니다.<br>
* Git Flow 전략의 Branch 구성<br>
	*Master Branch : 서비스를 배포하는 용도로 쓰는 Branch입니다.<br>
	*Develop Branch: 개발용 default 브랜치로, 이 Branch를 기준으로 feature Branch 따고, 각 feature를 합치는 Branch입니다.<br>
	*Feature Branch: 단위 기능 개발용 Branch입니다.<br>
	*Release Branch: 다음배포를 위해 기능에 문제가 없는지 품질체크 용도의 Branch입니다.<br>
	*Hotfix Branch: 배포가 되고 나서 버그 발생 시 긴급 수정하는 Branch입니다.<br>
	*Support Branch: 버전 호환성을 위한 Branch입니다.<br>
* Git Flow 전략의 장점과 단점<br>
	*장점 <br>
		*>1. Branch별로 책임을 명확히 하는 규칙성이 있다.<br>
		*>2. 매우 디테일하게 버전 정보 제공이 가능하다.<br>
		*>3. Master Branch에 있는 코드는 안정된 상태로 존재가 가능하다.<br>
		*>4. Branch별로 역할이 있으므로 문제가 있더라도 문제 발생시 각 Branch를 대기 시킬 필요가 없다.<br>
	*단점<br>
		*>1. 많은 Branch로 인해 복잡한 규칙이 존재한다.<br>
		*>2. Release Branch로 인한 많은 동기화 작업이 필요하다.<br>
		*>3. 애자일의 반복적인 접근법과 Git-Flow의 엄격하고 구체적인 규칙과 충돌 위험이 있다.<br>
 

>2.Github Flow 전략 <br>
* Github Flow 전략이란?
	*Github 환경에서 사용하기 적합한 Git Branch 전략, 웹 어플리케이션 개발에 적합한 Git Branch 전략입니다.
* Github Flow 전략의 Branch 구성
	* Main Branch : 항상 Stable한 상태, 모든 commit은 언제 배포하든 문제 없어야함, 언제든 새로운 Branch를 만들어도 문제 없어야함, 항상 빌드가 되고, 테스트를 통과해야하는 Branch입니다.
	* Topic Branch : 새로운 Branch를 개발할 때 사용하는 Branch, 기능 개발 및 버그 수정을 위한 브랜친
		*Topic Branch의 네이밍 방법 : 기능을 설명하는 명확한 이름 
			* ex) user-content-cache-key, redis-transition 등 ..

* Github Flow 전략의 장점과 단점
	*장점<br>
		*>1. 깔끔하고 간단한 협력이 가능하다.<br>
		*>2. 지속적인 통합과 편리한 개발이 가능하다.<br>
		*>3. 빠른 피드백과 이슈 발행 및 변화가 가능하다. <br>
	*단점<br>
		*>1. Git-Flow 전략에 비해 체계적이지 않고, 자유분방한 코드 관리로 전체적인 개발 프로세스 관리가 더 힘들어질 수 있다.<br>
		*>2. 짧은 주기가 아닌 큰 주기의 release의 환경에는 맞지 않다.<br>
		*>3. 운영과 개발 브랜치 모두를 감당하는 Main Branch 코드가 지저분 할 수 있다. <br>
		*>4. Main Branch에서 release 준비와 버그 수정이 이루어지므로 특별한 주의가 더 필요하다.<br>
> \---------------------------------------------------------------------------------------------- <br>		

* Github Flow 전략 선정 이유<br>
* 우리가 개발하는 The-fit은 여러 버전을 관리하지 않고, 가장 최신 버전 하나만을 사용자가 사용하게 된다.<br>
따라서 롤백이 필요하지 않고, release 버전만 제공하는 Github Flow 전략이 적절하다 판단하여 Github Flow을 사용하게 되었습니다.<br>

>3.기타.<br>
* ex)Gitlab Flow, Trunk-based-Development 등의 전략이 존재한다.<br>










