---
templateKey: programming
date: 2018-06-23
title: Head First Design Pattern 요약 정리
description: 
image: '/img/default.jpeg'
---

## Table of Contents

---

- [Observer](#observer)
- [Strategy](#strategy)
- [Decorator](#decorator)
- [Factory Method](#factory-method)
- [Singleton](#singleton)
- [Command](#command)
- [Adapter](#adapter)
- [Facade](#facade)
- [Template Method](#template-method)
- [Iterator](#iterator)
- [Composite](#composite)

## <a name="observer"></a>Observer

---

옵저버 패턴에서는 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들한테 상태변화를 알리고, 내용을 갱신해주는 일대다(one to many)의존성을 정의한다.

### background & pattern

- 한 객체의 상태가 변화할 때, 즉각적으로 다른 객체에게 알려야 할 때 옵저버 패턴을 고려할 수 있다. 상태 변화를 느슨한 결합으로 전파가능하다.
- 전파할 데이터 상태를 가지고 있고, 알리는 객체를 subject라고 하고 변화를 구독하는 객체를 observer 라고한다.

### code with python

```python
class Subject:
    def __init__(self):
        self.__observers = []

    def register_observer(self, observer):
        self.__observers.append(observer)

    def unregister_observer(self, observer):
        if observer in self.__observers
            self.__observer.remove(observer)

    def notify_observers(self, *args, **kwargs):
        for observer in self.__observers:
            observer.notify(self, *args, **kwargs)

class Observer:
    def __init__(self, subject):
        subject.register_observer(self)

    def notify(self, subject, *args, **kwargs):
        print('Got', args, kwargs, 'From', subject)


subject = Observable()
observer = Observer(subject)
subject.notify_observers('test')
```

### misc

- 느슨한 결합 : 상호작용은 하지만 서로에 대해 잘 모른다.

## <a name="strategy"></a> Strategy

---

알고리즘군을 정의하고 각각 캡슐화하여 교환해서 사용할 수 있도록 만든다. 스트래티지를 활용하면 알고리즘과 알고리즘을 사용하는 클라언트를 분리하여 관리할 수 있다.

### background & pattern

- 상속을 남용하면 문제가 생긴다. 부모클래스의 메소드가 자식클래스에 영향을 미처 수정시 사이드이팩트가 발생 할 수 있고, 오버라이딩 이용하면 서브클래스에서 코드가 중복된다.
- 부모 클래스의 인터페이스를 사용한다면 결국 서브클래스에서 모두 구현하므로 코드 재사용 관점에서 비효율적이다.
- 클래스의 행위를 따로 클래스(인터페이스 or 추상클래스)로 정의하고,여러 상황의 행위를 구현한다. 이 행동이 정의된 클래스를, 행동을 할 클래스에서 이용한다.
- 특정 '행동'도 객체라고 사고 할 수 있다. 행위를 하고자하는 클래스와, 행위 클래스가 나눈다. 이는 행위의 주체 객체에 행위를 '구성' 할 수 있다.

### code with java

```java

// 행위 인터페이스
public interface FlyBehavior {
    public void fly() { }
}

// 행위 구현체
public class FlyWithWings implements FlyBehavior {
    public void fly() {
        System.out.println("I'm flying!!");
    }
}

// 행위를 할 객체의 클래스
public abstract class Duck {
    FlyBehavior flyBehavior;

    public Duck() { }

    public void setFlyBehavior(FlyBehavior fb) {
        flyBehavior = fb;
    }

    // 행위를 표현하는 객체 사용
    public void performFly() {
        flyBehavior.fly();
    }
    // 서브클래스에서 공통적으로 정의되어야할 메소드
    abstract void display();

    // 서브클래스 모두 공통적으로 같은 행위를 하는 메소드
    public void swim() {
        System.out.println("All ducks float, even decoys!");
    }
}

public class WingsDuck implements Duck {
    public WingDuck() {}
}

public class Runner() {
    public static void main(String[] args) {
        Duck wingDuck = new WingDuck();
        wingDuck.setFlyBehavior(new FlyWithWings());
    }
}
```

## <a name="decorator"></a> Decorator

---

객체에 추가적인 요건을 동적으로 첨가한다. 데코레이터는 서브클래스를 만드는 것을 통해서 기능을 유연하게 확장할 수 있는 방법을 제공한다.

### background & pattern

- 추상 메소드를 정의하면 서브클레스에서 그 메소드를 새로 정의해야 한다. 음료 추상클래스가 있고, 추상 클래스의 여러 커피 종류가 있는 상황을 생각 할 수 있다. 이러한 상황은 컴파일타임에서 서브클래스의 메소드들이 결정되게 된다.

- 특정 구상 구성요소인지를 확인한 다음 어떤 작업을 처리한느 경우에는 데코레이터 코드가 제대로 작동하지 않을 수 있다. 아래 예제의 HouseBlend 만 Mocha를 추가 했을 때 cost 할인해준다는 식의 접근은 불가하다. 따라서 추상 구성요소 형식을 바탕으로 돌아가는 코드에 대해서 더욱 적합하다.

- 데코레이터의 형식이 그 데코리에터로 감싸는 객체의 형식과 같게 하여, 기존의 클래스를 확장하면서 코드 변화에는 닫혀있는 OCP(open closed principle)를 만족 할 수 있다.

- 데코레이터 패턴을 과하게 이용하다보면, 즉 감싸는 클래스가 많아지면,  코드를 유지보수하는데 어려움을 줄 수 있다.

### code with java

```java
public abstract class Beverage {
    public abstract double cost();
}

// 첨가물을 나타내는 추상클래스(데코레이터)
public abstract class CodimentDecorator extends Beverage {}

public class Esopresso extends Beverage {
    public double cost() {
        return 1.99;
    }
}

public class HouseBlend extends Beverage {
    public double code() {
        return .89;
    }
}

public class Mocha extends CodimentDecorator {
    Beverage beverage;

    public Mocha (Beverage beverage) {
        this.beverage = beverage;
    }

    public double cost() {
        // 첨가물의 가격을 더해준다.
        return 0.2 + this.beverage.cost();
    }
}

public static void main(String args[]) {
    Beverage beverage = Esopresso();
    // 모카 두번 추가!
    beverage = new Mocha(beverage);
    beverage = new Mocha(beverage);
    Systme.out.println("에소프레소에 모카 두번!" + beverage.cost());
}
```

### misc

- OPC(open closed principle) : 확장에 대해서는 열려 있어야 하지만 코드 변경에 대해서는 닫혀 있어야 한다. 그러나 무조건 OCP 를 적용하는 것은 불필요하게 복잡하고 유지보수하기 힘든 코드를 만들 수 있으므로 주의해야 한다.

## <a name="factory-method"></a>Factory Method

---

객체의 생성하는 것을 캡슐화하는 패턴을 factory 라고 한다. 특히 서브클래스에서 어떤 객체를 만들지 강제하는 것을 factory method 패턴이라고 한다.

### background & pattern

- concrete class를 많이 사용하면 새로운 concrete class 를 추가 할 때마다 코드를 고쳐야 하는 경우가 있다. 즉 변화에 닫혀있는 코드가 된다.
    ```java
    Duck duck
    if(sth) {
        duck = new MallardDuck();
    } else {
        duck = new RubberDuck();
    }
    ```

- 위와 같이 객체를 생성하는 부분을 캡슐한 class를 factory 라고 한다. 단순히 factory 클래스로 코드를 옮겼을 뿐이지만, 충분히 가치가 있다. OOP 에서 객체생성은 피할 수 없으므로 이를 잘 관리하는 것은 중요하다.

- 팩토리보다는 팩토리메소드 패턴이 언터페이스를 정의하고 서브클래스의 구현을 강제하여 일관된 패턴을 가져갈 수 있다. (아래 예제 코드 참고)

- 팩토리에서 concrete class 를 의존하게 되면, 생성할 객체의 종류가 늘어남에 따라 팩토리에 의존성들이 늘어나게 된다. 이때 생성할 객체를 추상화하여 그것을 의존하면, 팩토리는 추상화된 것에 의존하게 된다. 이러한 것을 의존성 뒤집기라 한다.


### code with java

```java
// factoray method pattern
public abstract class PizzaStore {

    public Pizza orderPizza(String type){
        Pizza pizza;
        pizza = createPizza(type);

        pizza.prepare();

        return pizza;
    }

    // 서브클래스에서 객체 생성하는 작업을 캡슐화 한다.
    protected abstarctPizza createPizza(String type); 
}
```

### misc

- concrete class: abstract class, interface가 아닌, 모든 오퍼레이션의 구현을 제공하는 class. 번역으로 '구상클래스'라고도 한다.

- 의존성 뒤집기:

    ![iod1](/img/programming/iod1.png "iod1")

    ![iod2](/img/programming/iod2.png "iod2")

### reference

- [https://www.oreilly.com/library/view/head-first-design/0596007124/ch04.html](https://www.oreilly.com/library/view/head-first-design/0596007124/ch04.html)

## <a name="singleton"></a>Singleton

---

해당 클래스의 인스턴스가 하나만 만들어지고, 어디서든지 그 인스턴스에 접근할 수 있도록 하기 위한 패턴.

### background & pattern

- 사실상 객체중에 하나만 있으면 되는것이 많다. 쓰레드풀이라던지, 사용자 설정등이 그러하다. 컴퓨팅 자원관점에서도 그러하고 개념적인 설계 관점에서도 그러하다.

- 전역 변수로 관리하면 저녁 네임스페이스가 관리되지 않고, 어플리케이션이 시작하자 마자 자원을 차지하기 때문에 오버헤드가 있을 수 있다. 싱글턴 패턴이 전역 네임스페이스의 문제는 완벽히 해결하지 못해도, 인스턴스를 lazy load 해준다는 관점에서는 그 효용이 명백하다. 객체 생성비용이 많을 때에는 lazy load 를 고려해볼 수 있다.

### code with java

```java

// simple singleton
public class Singleton {
    private static Singleton uniqueInstance;

    // 외부에서 생성자 호출를 막는다.
    private Singleton() {};

    // 'synchronized' 를 사용하여 thread safe 한 코드를 만든다. 
    // uniqueInstance가 없을 때 멀티 쓰레드가 동시에 getInstance 를 호출하면 객체가 여러개 생길 수 있다.
    public static synchronized Singleton getInstance(){
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}

// synchronized를 이용한 method 동기화의 오버헤드를 부담이 되는 경우라면, 처음 class가 load 될 때 생성 할 수 있다.
public class SingletonWithoutSyncronizedMethod {
    // JVM 에서는 class loader 마다 서로다른 네임스페이스를 정의 하기 때문에,
    // 클래스가 여러번 로드되어 싱글턴이 여러개 만들어질 수 있으니 클래스 로더를 조심히 살피자.
    private static SingletonWithoutSyncronizedMethod uniqueInstance = new SingletonWithoutSyncronizedMethod();

    // 외부에서 생성자 호출를 막는다.
    private SingletonWithoutSyncronizedMethod() {};.
    public static synchronized SingletonWithoutSyncronizedMethod getInstance(){
        return uniqueInstance;
    }
}
```

## <a name="command"></a>Command

---

요청을 객체의 형태로 캡슐화하여 사용자가 보낸 요청을 나중에 이용할 수 있도록 매서드 이름, 매개변수 등 요청에 필요한 정보를 저장 또는 로깅, 취소할 수 있게 하는 패턴이다.

### background & pattern

- 커맨드 패턴에는 명령(command), 수신자(receiver), 발동자(invoker), 클라이언트(client)의 네개의 용어가 항상 따른다. 
    - 커맨드 객체는 수신자 객체를 가지고 있으며, 수신자의 메서드를 호출하고, 이에 수신자는 자신에게 정의된 메서드를 수행한다.
    - 클라이언트 객체는 어느 시점에서 어떤 명령을 수행할지를 결정한다. 명령을 수행하려면, 클라이언트 객체는 invoker 객체로 커맨드 객체를 전달한다.

- invoker 입장에서는 Command 객체의 정의된 excute 만 사용하면 되기때문에 캡슐화의 이점을 얻는다. (아래 코드 참고) 

- 커맨드 패턴을 이용하면 Command 객체를 이용하고 한참 후에도 일련의 computation 을 진행할 수 있다. 이러한 시나리오는 스케줄러, 스레드풀, 작업 큐 같은 상황에서 유용하다. 작업 큐는 커맨드들의 excute 를 호출하기만 하면 된다.

### code with java

```java

/*the Invoker class*/
public class Switch {
    private Command flipUpCommand;
    private Command flipDownCommand;

    public Switch(Command flipUpCmd,Command flipDownCmd){
        this.flipUpCommand=flipUpCmd;
        this.flipDownCommand=flipDownCmd;
    }

    public void flipUp(){
         flipUpCommand.execute();
    }

    public void flipDown(){
         flipDownCommand.execute();
    }
}


/*Receiver class*/
public class Light{
     public Light(){  }

     public void turnOn(){
        System.out.println("The light is on");
     }

     public void turnOff(){
        System.out.println("The light is off");
     }
}


/*the Command interface*/
public interface Command{
    void execute();
}

public class TurnOnLightCommand implements Command{
   private Light theLight;

   public TurnOnLightCommand(Light light){
        this.theLight=light;
   }

   public void execute(){
      theLight.turnOn();
   }
}


/*The test class*/
public class TestCommand{
   public static void main(String[] args){
       Light light=new Light();
       Command switchUp=new TurnOnLightCommand(light);
       Command switchDown=new TurnOffLightCommand(light);

       Switch s=new Switch(switchUp,switchDown);

       s.flipUp();
       s.flipDown();
   }
}

```

### reference

- [https://ko.wikipedia.org/wiki/%EC%BB%A4%EB%A7%A8%EB%93%9C_%ED%8C%A8%ED%84%B4](https://ko.wikipedia.org/wiki/%EC%BB%A4%EB%A7%A8%EB%93%9C_%ED%8C%A8%ED%84%B4)

## <a name="adapter"></a>Adapter

---

한 클래스의 인터페이스를 클라이언트에서 사용하고자하는 다른 인터페이스로 변환한다. 어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있다.

### background & pattern

- 기존 클래스를 사용하고 싶으나, 인터페이스가 다른 경우. 인터페이스를 맞추는 패턴

- 어댑터 클래스에서 목표로 하는 객체를 받아서 구현하는 object adapter 가 있고, 다중 상속을 통해 클라이언트에 공개할 인터페이스는 public 으로 상속받고, 내부 구현을 private 으로 감추는 class adapter 가 있다.

### code with java

```java

 public interface Duck {
    public void quack();
    public void fly();
 }

 public class MallardDuck implements Duck {
    public void quack() {
        System.out.println("Quack");
    }
    public void fly() {
        System.out.println("I'm flying");
    }
 }
 public interface Turkey {
    public void gobble();
    public void fly();
 }

public class TurkeyAdapter implements Duck {
    Turkey turkey;
    public TurkeyAdapter(Turkey turkey) {
        this.turkey = turkey;
    }

    public void quack(){
        turkey.gobble();
    }

    public void fly() {
        turkey.fly();
    }
 }
```

## <a name="facade"></a>Facade

---

어떤 서브세스템의 일련의 인터페이스에 대한 통합된 인터페이스를 제공합니다. 퍼사드에서 고수준 인터페이스를 정의하기 때문에 서브시스템을 더 쉽게 사용할 수 있습니다. 

### background & pattern

- 개념적인 하나의 일을 하기 위해서, 여러객체와 상호작용을 많이 하는 경우 고수준의 인터페이스를 정의할 필요가 있다. 더욱 서브시스템의 객체들의 인터페이스가 지저분한 경우 이러한 wrapper 를 고려할 수 있다.

### code with java

```java
class CPU {
    public void freeze() { ... }
    public void jump(long position) { ... }
    public void execute() { ... }
}

class HardDrive {
    public byte[] read(long lba, int size) { ... }
}

class Memory {
    public void load(long position, byte[] data) { ... }
}

/* Facade */
class ComputerFacade {
    private CPU processor;
    private Memory ram;
    private HardDrive hd;

    public ComputerFacade() {
        this.processor = new CPU();
        this.ram = new Memory();
        this.hd = new HardDrive();
    }

    public void start() {
        processor.freeze();
        ram.load(BOOT_ADDRESS, hd.read(BOOT_SECTOR, SECTOR_SIZE));
        processor.jump(BOOT_ADDRESS);
        processor.execute();
    }
}

/* Client */
class You {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        computer.start();
    }
}
```

### misc

- 최소 지식 원칙 - 복잡하게 상호작용하는 의존성들을 최소화 한다.

## <a name="template-method"></a>Template Method

---

알고리즘의 골격을 정의합니다. 알고리즘의 여러 단계 중 일부는 서브클래스에서 구현할 수 있습니다. 템플릿 메소드를 이용하면 알고리즘의 구조는 그대로 유지하면서 서브클래스에서 특정 단계를 재정의할 수 있습니다.

### background & pattern

- '비슷한' 일련의 알고리즘을 수행해야 한다면, 바뀌는 부분과 바뀌지 않는 부분을 명확하게 구분하야한다. 가령 여러 절차적인 메소드의 틀을 final 메소드로 구현하여 틀을 만들고, 그 안에서 공통으로 쓰이지 않는 메소드들을 abstract 메소드로 정의하면 코드 중복을 줄이고 확장성 있는 코드를 짤 수 있다.

### code with java

```java
public abstract class Beverage {
    final vodi prepare() {
        boilWater();
        brew();
        pourInCup()
    }

    abstract void brew();

    void boilWater() {
        System.out.println("boilWater");
    }

    void pourInCup() {
        System.out.println("pourInCup");
    }
}

public class Tea extends Beverage {
    public void brew() {
        System.out.println("Tea brew");
    }
}


public class Coffee extends Beverage {
    public void brew() {
            System.out.println("Coffee brew");
    }
}
```

## <a name="iterator"></a>Iterator

---

컬렉션 구현 방법을 노출시키지 않으면서도 그 집합체 안에 들어있는 모든 항목에 접근할 수 있게 해주는 방법을 제공해 줍니다.

### background & pattern

- 배열이든 스택이든 해시테이블이든, 어떠한 객체든 전부 순회하는 경우 객체 따라 순회하는 코드를 짜야한다면 iterator 를 고려해 볼 수 있다. 이 때 concrete class 에 맞춰서 분기하기보다 인터페이스에 의존하도록 하면 좋다. 만약 또다른 객체를 순회해야한다면 그 객체에 맞게 순환문도 추가해야 한다.



### code with java

```java
// 참고로 java.util.Iterator 인터페이스가 있다.
public interface Iterator {
    boolean hasNext();
    Object next();
}

public class DinerMenuIterator implements Iterator {
    MenuItem[] items;
    int position = 0;
 
    public DinerMenuIterator(MenuItem[] items) {
        this.items = items;
    }
 
    public MenuItem next() {
        MenuItem menuItem = items[position];
        position = position + 1;
        return menuItem;
    }
 
    public boolean hasNext() {
        if (position >= items.length || items[position] == null) {
            return false;
        } else {
            return true;
        }
    }
}
public class PancakeHouseMenuIterator implements Iterator {
    ArrayList<MenuItem> items;
    int position = 0;

    public PancakeHouseMenuIterator(ArrayList<MenuItem> items) {
        this.items = items;
    }

    public MenuItem next() {
        MenuItem item = items.get(position);
        position = position + 1;
        return item;
    }

    public boolean hasNext() {
        if (position >= items.size()) {
            return false;
        } else {
            return true;
        }
    }
}
```

## <a name="composite"></a>Composite

---

객체들을 트리 구조로 구성하여 부분과 전체를 나타내는 계층구조로 만들 수 있습니다. 이 패턴을 이용하면 클라이언트에서 개별 객체와 다른 객체들로 구성된 복합 객체를 똑같은 방법으로 다룰 수 있습니다.

### background & pattern

- 메뉴 리스트 및에 하위 메뉴 리스트를 구현한다고 하자. 전형적인 부분-전체 계층구조(part-whole hierarchy)이다.

### code with python

```python
from abc import ABC, abstractmethod

NOT_IMPLEMENTED = "You should implement this."


class Graphic(ABC):
    @abstractmethod
    def print(self):
        raise NotImplementedError(NOT_IMPLEMENTED)


class CompositeGraphic(Graphic):
    def __init__(self):
        self.graphics = []

    def print(self):
        for graphic in self.graphics:
            graphic.print()

    def add(self, graphic):
        self.graphics.append(graphic)

    def remove(self, graphic):
        self.graphics.remove(graphic)


class Ellipse(Graphic):
    def __init__(self, name):
        self.name = name

    def print(self):
        print("Ellipse:", self.name)


ellipse1 = Ellipse("1")
ellipse2 = Ellipse("2")
ellipse3 = Ellipse("3")
ellipse4 = Ellipse("4")

graphic = CompositeGraphic()
graphic1 = CompositeGraphic()
graphic2 = CompositeGraphic()

graphic1.add(ellipse1)
graphic1.add(ellipse2)
graphic1.add(ellipse3)

graphic2.add(ellipse4)

graphic.add(graphic1)
graphic.add(graphic2)

graphic.print()
```